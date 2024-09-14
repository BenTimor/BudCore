import { BudError } from "../../../types";

export class MissingProxyReference extends BudError {
    constructor() {
        super("MissingProxyReference", "A reference to a proxied element is expected after the 'proxy' keyword");
    }
}

export class MissingProxyBlock extends BudError {
    constructor() {
        super("MissingProxyBlock", "A block is expected with the proxy");
    }
}