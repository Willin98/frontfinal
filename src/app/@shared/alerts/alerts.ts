import { TYPE_ALERT } from './values.config';
import { EMAIL_PATTERN } from '@core/constants/regex';
import Swal from 'sweetalert2';

const swalBasicOptions = (title: string, html: string) =>
  Swal.mixin({
    title,
    html,
    focusConfirm: false,
    cancelButtonText: 'Cancelar',
    showCancelButton: true,
  });

export async function formBasicDialog(
  title: string,
  html: string,
  property: string
) {
  return await swalBasicOptions(title, html).fire({
    preConfirm: () => {
      const value = (document.getElementById('name') as HTMLInputElement).value;
      if (value) {
        return value;
      }
      Swal.showValidationMessage(
        'Tienes que añadir un genero para almacenarlo'
      );
      return;
    },
  });
}

export async function userFormBasicDialog(
  title: string,
  html: string,
) {
  return await swalBasicOptions(title, html).fire({
    preConfirm: () => {
      let error = '';
      const name = (document.getElementById('name') as HTMLInputElement).value;
      if (!name) {
        error += 'El nombre es obligatorio<br/>';
      }
      const lastname = (document.getElementById('lastname') as HTMLInputElement).value;
      if (!lastname) {
        error += 'El apellido es obligatorio<br/>';
      }
      const email = (document.getElementById('email') as HTMLInputElement).value;
      if (!email) {
        error += 'El email es obligatorio<br/>';
      }
      if(!EMAIL_PATTERN.test(email)) {
        error += 'Email no cumple el formato';
      }
      const role = (document.getElementById('role') as HTMLInputElement).value; 
      if(error !== ''){
        Swal.showValidationMessage(
          error
        );
        return;
      }
      return{
        name,
        lastname,
        email,
        role,
        birthday: new Date().toISOString()
      };
    },
  });
}

export async function optionsWithDetails(
  title: string,
  html: string,
  width: number | string,
  confirmButtonText: string = '',
  cancelButtonText: string = ''
) {
  return await Swal.fire({
    title,
    html,
    width: `${width}px`,
    showCloseButton: true,
    showCancelButton: true,
    confirmButtonColor: '#343a40',
    cancelButtonColor: '#dc3545',
    confirmButtonText,
    cancelButtonText,
  }).then((result) => {
    console.log(result);
    if (result.value) {
      console.log('Editar');
      return true;
    } else if (result.dismiss.toString() === 'cancel') {
      console.log('bloquear');
      return false;
    }
  });
}

export const loadData = (title: string, html: string) => {
  Swal.fire({
    title,
    html,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });
};

export const closeAlert = () => {
  Swal.close();
};

export const infoEventAlert = async (title: string, html: string, typeAlert: TYPE_ALERT = TYPE_ALERT.WARNING ) => {
  return await Swal.fire({
    title,
    html,
    icon: typeAlert,
    preConfirm: () => {
      return true;
    },
  });
};
