/**
 * Clase Direccion
 * 
 * Representa la dirección de una persona, incluyendo detalles como calle,
 * número, piso, código postal, provincia y localidad.
 * 
 * Atributos:
 *  - calle: Nombre de la calle.
 *  - numero: Número de la vivienda.
 *  - piso: Piso dentro del edificio (puede ser nulo si no aplica).
 *  - codigoPostal: Código postal (formato de 5 dígitos).
 *  - provincia: Provincia en la que se encuentra la dirección.
 *  - localidad: Localidad o ciudad de la dirección.
 */
class Direccion {
    #calle;
    #numero;
    #piso;
    #codigoPostal;
    #provincia;
    #localidad;

    constructor(calle, numero, piso, codigoPostal, provincia, localidad) {
        this.#calle = calle;
        this.#numero = numero;
        this.#piso = piso;
        this.#codigoPostal = (new String(codigoPostal).match(/^[0-9]{5}$/)) ? codigoPostal : "00000"; // Comprueba que el código postal tenga 5 números sino le asigna "00000"
        this.#provincia = provincia;
        this.#localidad = localidad;
    }

    get calle() {
        return this.#calle;
    }

    get numero() {
        return this.#numero;
    }

    get piso() {
        return this.#piso;
    }

    get codigoPostal() {
        return this.#codigoPostal;
    }

    get provincia() {
        return this.#provincia;
    }

    get localidad() {
        return this.#localidad;
    }

    toString() {
        return `Calle ${this.#calle} ${this.#numero}, Piso ${this.#piso}, ${this.#codigoPostal} - ${this.#provincia}, ${this.#localidad}`;
    }
}

export default Direccion;
