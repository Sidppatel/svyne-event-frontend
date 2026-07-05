



import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { PricingService } from "./pricing";
import type { SetTenantDefaultFeeFormulaRequest } from "./pricing";
import type { PriceBreakdown } from "./pricing";
import type { CalculatePriceRequest } from "./pricing";
import type { ListPriceRulesResponse } from "./pricing";
import type { UpdatePriceRuleRequest } from "./pricing";
import type { CreatePriceRuleRequest } from "./pricing";
import type { ListPricesResponse } from "./pricing";
import type { Price } from "./pricing";
import type { AckResponse } from "./common";
import type { UpdatePriceRequest } from "./pricing";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { UuidValue } from "./common";
import type { CreatePriceRequest } from "./pricing";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";

export interface IPricingServiceClient {
    
    createPrice(input: CreatePriceRequest, options?: RpcOptions): UnaryCall<CreatePriceRequest, UuidValue>;
    
    updatePrice(input: UpdatePriceRequest, options?: RpcOptions): UnaryCall<UpdatePriceRequest, AckResponse>;
    
    getPrice(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, Price>;
    
    listPricesForEvent(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, ListPricesResponse>;
    
    deletePrice(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, AckResponse>;
    
    createPriceRule(input: CreatePriceRuleRequest, options?: RpcOptions): UnaryCall<CreatePriceRuleRequest, UuidValue>;
    
    updatePriceRule(input: UpdatePriceRuleRequest, options?: RpcOptions): UnaryCall<UpdatePriceRuleRequest, AckResponse>;
    
    deletePriceRule(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, AckResponse>;
    
    listPriceRules(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, ListPriceRulesResponse>;
    
    listEventPriceRules(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, ListPriceRulesResponse>;
    
    calculatePrice(input: CalculatePriceRequest, options?: RpcOptions): UnaryCall<CalculatePriceRequest, PriceBreakdown>;
    
    setTenantDefaultFeeFormula(input: SetTenantDefaultFeeFormulaRequest, options?: RpcOptions): UnaryCall<SetTenantDefaultFeeFormulaRequest, AckResponse>;
}

export class PricingServiceClient implements IPricingServiceClient, ServiceInfo {
    typeName = PricingService.typeName;
    methods = PricingService.methods;
    options = PricingService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    
    createPrice(input: CreatePriceRequest, options?: RpcOptions): UnaryCall<CreatePriceRequest, UuidValue> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<CreatePriceRequest, UuidValue>("unary", this._transport, method, opt, input);
    }
    
    updatePrice(input: UpdatePriceRequest, options?: RpcOptions): UnaryCall<UpdatePriceRequest, AckResponse> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<UpdatePriceRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    getPrice(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, Price> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<UuidValue, Price>("unary", this._transport, method, opt, input);
    }
    
    listPricesForEvent(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, ListPricesResponse> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<UuidValue, ListPricesResponse>("unary", this._transport, method, opt, input);
    }
    
    deletePrice(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, AckResponse> {
        const method = this.methods[4], opt = this._transport.mergeOptions(options);
        return stackIntercept<UuidValue, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    createPriceRule(input: CreatePriceRuleRequest, options?: RpcOptions): UnaryCall<CreatePriceRuleRequest, UuidValue> {
        const method = this.methods[5], opt = this._transport.mergeOptions(options);
        return stackIntercept<CreatePriceRuleRequest, UuidValue>("unary", this._transport, method, opt, input);
    }
    
    updatePriceRule(input: UpdatePriceRuleRequest, options?: RpcOptions): UnaryCall<UpdatePriceRuleRequest, AckResponse> {
        const method = this.methods[6], opt = this._transport.mergeOptions(options);
        return stackIntercept<UpdatePriceRuleRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    deletePriceRule(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, AckResponse> {
        const method = this.methods[7], opt = this._transport.mergeOptions(options);
        return stackIntercept<UuidValue, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    listPriceRules(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, ListPriceRulesResponse> {
        const method = this.methods[8], opt = this._transport.mergeOptions(options);
        return stackIntercept<UuidValue, ListPriceRulesResponse>("unary", this._transport, method, opt, input);
    }
    
    listEventPriceRules(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, ListPriceRulesResponse> {
        const method = this.methods[9], opt = this._transport.mergeOptions(options);
        return stackIntercept<UuidValue, ListPriceRulesResponse>("unary", this._transport, method, opt, input);
    }
    
    calculatePrice(input: CalculatePriceRequest, options?: RpcOptions): UnaryCall<CalculatePriceRequest, PriceBreakdown> {
        const method = this.methods[10], opt = this._transport.mergeOptions(options);
        return stackIntercept<CalculatePriceRequest, PriceBreakdown>("unary", this._transport, method, opt, input);
    }
    
    setTenantDefaultFeeFormula(input: SetTenantDefaultFeeFormulaRequest, options?: RpcOptions): UnaryCall<SetTenantDefaultFeeFormulaRequest, AckResponse> {
        const method = this.methods[11], opt = this._transport.mergeOptions(options);
        return stackIntercept<SetTenantDefaultFeeFormulaRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
}
