import { CURRENCY_CODE } from "@core/constants/config";
import { Router } from "@angular/router";
import { AuthService } from "@core/services/auth.service";
import { IMeData } from "@core/interfaces/session.interface";
import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { StripePaymentService } from "@mugan86/stripe-payment-form";
import { take } from "rxjs/internal/operators/take";
import { CartService } from "@film/core/services/cart.service.ts.service";
import { infoEventAlert, loadData } from "@shared/alerts/alerts";
import { CustomerService } from "@film/core/services/stripe/customer.service";
import { TYPE_ALERT } from "@shared/alerts/values.config";
import { ChargeService } from "@film/core/services/stripe/charge.service";
import { ICart } from "@film/core/components/shopping-cart/shoppin-cart.interface";
import { ICharge } from "@core/interfaces/stripe/charge.interface";
import { IMail } from "@core/interfaces/mail.interface";
import { MailService } from "@core/services/mail.service";
import { IPayment } from "@core/interfaces/stripe/payment.interface";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"],
})
export class CheckoutComponent implements OnInit {
  meData: IMeData;
  key = environment.stripePublicKey;
  available = false;
  block = false;
  constructor(
    private auth: AuthService,
    private router: Router,
    private stripePayment: StripePaymentService,
    private cartService: CartService,
    private customerService: CustomerService,
    private chargeService: ChargeService,
    private mailService: MailService
  ) {
    this.auth.accessVar$.subscribe((data: IMeData) => {
      if (!data.status) {
        //ir al login
        this.router.navigate(["/login"]);
        return;
      }
      this.meData = data;
    });

    this.cartService.itemsVar$.pipe(take(1)).subscribe((cart: ICart) => {
      if (this.cartService.cart.total === 0 && this.available === false) {
        this.available = false;
        this.notAvailableProducts();
      } 
    });

    this.stripePayment.cardTokenVar$
      .pipe(take(1))
      .subscribe((token: string) => {
        if (token.indexOf("tok_") > -1 && this.meData.status) {
          if (this.cartService.cart.total === 0) {
            this.available = false;
            this.notAvailableProducts();
          }
          //Almacenar la informacion para enviar
          const payment: IPayment = {
            token,
            amount: this.cartService.cart.total.toString(),
            description: this.cartService.orderDescription(),
            customer: this.meData.user.stripeCustomer,
            currency: CURRENCY_CODE,
          };
          this.block = true;
          loadData("Realizando el pago", "Espera mientras se valida el pago");
          //Enviar la informacion y procesar el pago
          this.chargeService
            .pay(payment)
            .pipe(take(1))
            .subscribe(
              async (result: {
                status: boolean;
                message: string;
                charge: ICharge;
              }) => {
                if (result.status) {
                  console.log("OK");
                  console.log(result.charge);
                  await infoEventAlert(
                    "Pedido realizado correctamente",
                    "Has efectuado correctamente el pago",
                    TYPE_ALERT.SUCCESS
                  );
                  this.sendEmail(result.charge);
                  this.router.navigate(['/orders']);
                  this.cartService.clear();
                  return;
                } else {
                  console.log(result.message);
                  await infoEventAlert(
                    "Pedido NO SE HA realizado",
                    "Hubo un fallo al realizar el pago",
                    TYPE_ALERT.SUCCESS
                  );
                }
                this.block = false;
              }
            );
        }
      });
  }

  sendEmail(charge: ICharge) {
    const mail: IMail = {
      to: charge.receiptEmail,
      subject: 'Confirmación del pedido',
      html: `
      El pedido se ha realizado correctamente.
      Puedes consultarlo en <a href="${charge.receiptUrl}" target="_blank">esta url</a>
      `
    };
    this.mailService.send(mail).pipe(take(1)).subscribe();
  }
  
  async notAvailableProducts() {
    this.cartService.close();
    this.available = false;
    await infoEventAlert(
      "Acción no disponible",
      "No puedes realizar el pago sin productos en el carrito de la compra"
    );
    this.router.navigate(["/"]);
  }

  ngOnInit(): void {
    this.auth.start();
    this.cartService.initialize();
    localStorage.removeItem("route_after_login");
    this.block = false;
    if (this.cartService.cart.total === 0) {
      this.available = false;
      this.notAvailableProducts();
    } else {
      this.available = true;
    }
  }

  async sendData() {
    if (this.meData.user.stripeCustomer === null) {
      await infoEventAlert(
        "Cliente no existe",
        "Necesitamos un cliente para realizar el pago"
      );
      const stripeName = `${this.meData.user.name} ${this.meData.user.lastname}`;
      loadData("Procesando la informacion", "Creando el cliente...");
      this.customerService
        .add(stripeName, this.meData.user.email)
        .pipe(take(1))
        .subscribe(async (result: { status: boolean; message: string }) => {
          if (result.status) {
            await infoEventAlert(
              "Cliente añadido al usuario",
              "Reiniciar la sesion",
              TYPE_ALERT.SUCCESS
            );
            localStorage.setItem("route_after_login", this.router.url);
            this.auth.resetSession();
          } else {
            await infoEventAlert(
              "Cliente no añadido",
              result.message,
              TYPE_ALERT.WARNING
            );
          }
        });
      return;
    }
    this.stripePayment.takeCardToken(true);
  }
}
