const base64 = require("base-64");
import pkgConfig from "../../package.json";
const vaultEndpoint = "https://vault.omise.co/";
const apiEndpoint = "https://api.omise.co/";

/**
 * ReactNativeOmise
 */
class ReactNativeOmise {
  private _publicKey: string = "";
  private _privateKey: string = "";
  private _apiVersion: string = "2015-11-17";
  /**
   * constructor
   */
  constructor() {
    this.charge = this.charge.bind(this);
    this.createToken = this.createToken.bind(this);
    this.getCapabilities = this.getCapabilities.bind(this);
  }

  /**
   * To set a public key and API version
   * @param {String} publicKey
   * @param {String} apiVersion
   */
  config(privateKey: string, publicKey: string) {
    this._publicKey = publicKey;
    this._privateKey = privateKey;
  }

  /**
   * Get headers
   * @return {*} headers
   */
  getHeaders(options = { usePrivateKey: false }) {
    const { usePrivateKey } = options;
    let headers: Record<string, string> = {
      Authorization:
        "Basic " +
        base64.encode(usePrivateKey ? this._privateKey : this._publicKey + ":"),
      "User-Agent": pkgConfig.name + "/" + pkgConfig.version,
      "Content-Type": "application/json",
    };

    if (this._apiVersion && this._apiVersion !== "") {
      headers["Omise-Version"] = this._apiVersion;
    }

    return headers;
  }

  /**
   * Create a token
   * @param {*} data
   *
   * @return {*}
   */
  // @ts-ignore
  createToken(data) {
    const tokenEndpoint = vaultEndpoint + "tokens";
    // set headers
    let headers = this.getHeaders();

    return new Promise((resolve, reject) => {
      // verify a public key
      if (!this._publicKey || this._publicKey === "") {
        reject("Please config your public key");
        return;
      }

      return fetch(tokenEndpoint, {
        method: "POST",
        // @ts-ignore
        cache: "no-cache",
        headers: headers,
        body: JSON.stringify(data),
      })
        .then(response => {
          if (response.ok && response.status === 200) {
            resolve(response.json());
          } else {
            console.log("response not ok", response);
            reject(response.json());
          }
        })
        .catch(error => resolve(error));
    });
  }

  /**
   * Create a source
   * @param {*} data
   *
   * @return {*}
   */
  // @ts-ignore
  charge(data) {
    const sourceEndpoint = apiEndpoint + "charges";
    // set headers
    let headers = this.getHeaders({ usePrivateKey: true });

    return new Promise((resolve, reject) => {
      // verify a public key
      if (!this._publicKey || this._publicKey === "") {
        reject("Please config your public key");
        return;
      }

      return fetch(sourceEndpoint, {
        method: "POST",
        // @ts-ignore
        cache: "no-cache",
        headers: headers,
        body: JSON.stringify(data),
      })
        .then(response => {
          if (response.ok && response.status === 200) {
            resolve(response.json());
          } else {
            console.log("response not ok", response);
            reject(response.json());
          }
        })
        .catch(error => resolve(error));
    });
  }

  /**
   * @return {*}
   */
  getCapabilities() {
    const sourceEndpoint = apiEndpoint + "capability";
    // set headers
    let headers = this.getHeaders();

    return new Promise((resolve, reject) => {
      // verify a public key
      if (!this._publicKey || this._publicKey === "") {
        reject("Please config your public key");
        return;
      }

      return fetch(sourceEndpoint, {
        method: "GET",
        // @ts-ignore
        cache: "no-cache",
        headers: headers,
      })
        .then(response => {
          if (response.ok && response.status === 200) {
            resolve(response.json());
          } else {
            console.log("response not ok", response);
            reject(response.json());
          }
        })
        .catch(error => resolve(error));
    });
  }
}

export default new ReactNativeOmise();
