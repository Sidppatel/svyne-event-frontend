



import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { AuthService } from "./auth";
import type { LinkGoogleRequest } from "./auth";
import type { SetAvatarRequest } from "./auth";
import type { UpdateProfileRequest } from "./auth";
import type { UserProfile } from "./auth";
import type { Empty } from "./common";
import type { SetPasswordRequest } from "./auth";
import type { ValidateResetTokenRequest } from "./auth";
import type { PasswordResetRequest } from "./auth";
import type { MagicLinkVerifyRequest } from "./auth";
import type { MagicLinkRequest } from "./auth";
import type { AckResponse } from "./common";
import type { LogoutRequest } from "./auth";
import type { RefreshTokenRequest } from "./auth";
import type { GoogleSignInRequest } from "./auth";
import type { SignUpRequest } from "./auth";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { AuthResponse } from "./auth";
import type { LoginRequest } from "./auth";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";

export interface IAuthServiceClient {
    
    login(input: LoginRequest, options?: RpcOptions): UnaryCall<LoginRequest, AuthResponse>;
    
    signUp(input: SignUpRequest, options?: RpcOptions): UnaryCall<SignUpRequest, AuthResponse>;
    
    googleSignIn(input: GoogleSignInRequest, options?: RpcOptions): UnaryCall<GoogleSignInRequest, AuthResponse>;
    
    refreshToken(input: RefreshTokenRequest, options?: RpcOptions): UnaryCall<RefreshTokenRequest, AuthResponse>;
    
    logout(input: LogoutRequest, options?: RpcOptions): UnaryCall<LogoutRequest, AckResponse>;
    
    requestMagicLink(input: MagicLinkRequest, options?: RpcOptions): UnaryCall<MagicLinkRequest, AckResponse>;
    
    verifyMagicLink(input: MagicLinkVerifyRequest, options?: RpcOptions): UnaryCall<MagicLinkVerifyRequest, AuthResponse>;
    
    requestPasswordReset(input: PasswordResetRequest, options?: RpcOptions): UnaryCall<PasswordResetRequest, AckResponse>;
    
    validatePasswordResetToken(input: ValidateResetTokenRequest, options?: RpcOptions): UnaryCall<ValidateResetTokenRequest, AckResponse>;
    
    setPassword(input: SetPasswordRequest, options?: RpcOptions): UnaryCall<SetPasswordRequest, AckResponse>;
    
    me(input: Empty, options?: RpcOptions): UnaryCall<Empty, UserProfile>;
    
    updateProfile(input: UpdateProfileRequest, options?: RpcOptions): UnaryCall<UpdateProfileRequest, UserProfile>;
    
    setAvatar(input: SetAvatarRequest, options?: RpcOptions): UnaryCall<SetAvatarRequest, UserProfile>;
    
    linkGoogle(input: LinkGoogleRequest, options?: RpcOptions): UnaryCall<LinkGoogleRequest, UserProfile>;
    
    unlinkGoogle(input: Empty, options?: RpcOptions): UnaryCall<Empty, UserProfile>;
}

export class AuthServiceClient implements IAuthServiceClient, ServiceInfo {
    typeName = AuthService.typeName;
    methods = AuthService.methods;
    options = AuthService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    
    login(input: LoginRequest, options?: RpcOptions): UnaryCall<LoginRequest, AuthResponse> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<LoginRequest, AuthResponse>("unary", this._transport, method, opt, input);
    }
    
    signUp(input: SignUpRequest, options?: RpcOptions): UnaryCall<SignUpRequest, AuthResponse> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<SignUpRequest, AuthResponse>("unary", this._transport, method, opt, input);
    }
    
    googleSignIn(input: GoogleSignInRequest, options?: RpcOptions): UnaryCall<GoogleSignInRequest, AuthResponse> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<GoogleSignInRequest, AuthResponse>("unary", this._transport, method, opt, input);
    }
    
    refreshToken(input: RefreshTokenRequest, options?: RpcOptions): UnaryCall<RefreshTokenRequest, AuthResponse> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<RefreshTokenRequest, AuthResponse>("unary", this._transport, method, opt, input);
    }
    
    logout(input: LogoutRequest, options?: RpcOptions): UnaryCall<LogoutRequest, AckResponse> {
        const method = this.methods[4], opt = this._transport.mergeOptions(options);
        return stackIntercept<LogoutRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    requestMagicLink(input: MagicLinkRequest, options?: RpcOptions): UnaryCall<MagicLinkRequest, AckResponse> {
        const method = this.methods[5], opt = this._transport.mergeOptions(options);
        return stackIntercept<MagicLinkRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    verifyMagicLink(input: MagicLinkVerifyRequest, options?: RpcOptions): UnaryCall<MagicLinkVerifyRequest, AuthResponse> {
        const method = this.methods[6], opt = this._transport.mergeOptions(options);
        return stackIntercept<MagicLinkVerifyRequest, AuthResponse>("unary", this._transport, method, opt, input);
    }
    
    requestPasswordReset(input: PasswordResetRequest, options?: RpcOptions): UnaryCall<PasswordResetRequest, AckResponse> {
        const method = this.methods[7], opt = this._transport.mergeOptions(options);
        return stackIntercept<PasswordResetRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    validatePasswordResetToken(input: ValidateResetTokenRequest, options?: RpcOptions): UnaryCall<ValidateResetTokenRequest, AckResponse> {
        const method = this.methods[8], opt = this._transport.mergeOptions(options);
        return stackIntercept<ValidateResetTokenRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    setPassword(input: SetPasswordRequest, options?: RpcOptions): UnaryCall<SetPasswordRequest, AckResponse> {
        const method = this.methods[9], opt = this._transport.mergeOptions(options);
        return stackIntercept<SetPasswordRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    me(input: Empty, options?: RpcOptions): UnaryCall<Empty, UserProfile> {
        const method = this.methods[10], opt = this._transport.mergeOptions(options);
        return stackIntercept<Empty, UserProfile>("unary", this._transport, method, opt, input);
    }
    
    updateProfile(input: UpdateProfileRequest, options?: RpcOptions): UnaryCall<UpdateProfileRequest, UserProfile> {
        const method = this.methods[11], opt = this._transport.mergeOptions(options);
        return stackIntercept<UpdateProfileRequest, UserProfile>("unary", this._transport, method, opt, input);
    }
    
    setAvatar(input: SetAvatarRequest, options?: RpcOptions): UnaryCall<SetAvatarRequest, UserProfile> {
        const method = this.methods[12], opt = this._transport.mergeOptions(options);
        return stackIntercept<SetAvatarRequest, UserProfile>("unary", this._transport, method, opt, input);
    }
    
    linkGoogle(input: LinkGoogleRequest, options?: RpcOptions): UnaryCall<LinkGoogleRequest, UserProfile> {
        const method = this.methods[13], opt = this._transport.mergeOptions(options);
        return stackIntercept<LinkGoogleRequest, UserProfile>("unary", this._transport, method, opt, input);
    }
    
    unlinkGoogle(input: Empty, options?: RpcOptions): UnaryCall<Empty, UserProfile> {
        const method = this.methods[14], opt = this._transport.mergeOptions(options);
        return stackIntercept<Empty, UserProfile>("unary", this._transport, method, opt, input);
    }
}
