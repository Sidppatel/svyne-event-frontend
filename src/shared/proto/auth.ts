



import { Empty } from "./common";
import { AckResponse } from "./common";
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";

export interface LinkGoogleRequest {
    
    googleToken: string;
}

export interface UpdateProfileRequest {
    
    firstName: string;
    
    lastName: string;
    
    phone: string;
    
    addressLine: string;
    
    city: string;
    
    state: string;
    
    zip: string;
}

export interface SetAvatarRequest {
    
    imagesId: string;
}

export interface LoginRequest {
    
    email: string;
    
    password: string;
    
    tenantSlug: string;
    
    portal: string;
}

export interface SignUpRequest {
    
    email: string;
    
    password: string;
    
    firstName: string;
    
    lastName: string;
    
    tenantSlug: string;
}

export interface GoogleSignInRequest {
    
    googleToken: string;
    
    tenantSlug: string;
    
    portal: string;
}

export interface RefreshTokenRequest {
    
    refreshToken: string;
}

export interface LogoutRequest {
    
    sessionHash: string;
}

export interface MagicLinkRequest {
    
    email: string;
    
    tenantSlug: string;
}

export interface MagicLinkVerifyRequest {
    
    token: string;
}

export interface PasswordResetRequest {
    
    email: string;
    
    tenantSlug: string;
    
    origin: string;
}

export interface ValidateResetTokenRequest {
    
    token: string;
}

export interface SetPasswordRequest {
    
    token: string;
    
    newPassword: string;
}

export interface AuthResponse {
    
    accessToken: string;
    
    refreshToken: string;
    
    expiresAt: string;
    
    user?: UserProfile;
}

export interface UserProfile {
    
    usersId: string;
    
    tenantsId: string;
    
    email: string;
    
    firstName: string;
    
    lastName: string;
    
    role: number;
    
    tenantSlug: string;
    
    emailVerified: boolean;
    
    avatarUrl: string;
    
    phone: string;
    
    addressLine: string;
    
    city: string;
    
    state: string;
    
    zip: string;
    
    googleConnected: boolean;
}

class LinkGoogleRequest$Type extends MessageType<LinkGoogleRequest> {
    constructor() {
        super("svyne.auth.LinkGoogleRequest", [
            { no: 1, name: "google_token", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<LinkGoogleRequest>): LinkGoogleRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.googleToken = "";
        if (value !== undefined)
            reflectionMergePartial<LinkGoogleRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: LinkGoogleRequest): LinkGoogleRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.googleToken = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: LinkGoogleRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.googleToken !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.googleToken);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const LinkGoogleRequest = new LinkGoogleRequest$Type();

class UpdateProfileRequest$Type extends MessageType<UpdateProfileRequest> {
    constructor() {
        super("svyne.auth.UpdateProfileRequest", [
            { no: 1, name: "first_name", kind: "scalar", T: 9  },
            { no: 2, name: "last_name", kind: "scalar", T: 9  },
            { no: 3, name: "phone", kind: "scalar", T: 9  },
            { no: 4, name: "address_line", kind: "scalar", T: 9  },
            { no: 5, name: "city", kind: "scalar", T: 9  },
            { no: 6, name: "state", kind: "scalar", T: 9  },
            { no: 7, name: "zip", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<UpdateProfileRequest>): UpdateProfileRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.firstName = "";
        message.lastName = "";
        message.phone = "";
        message.addressLine = "";
        message.city = "";
        message.state = "";
        message.zip = "";
        if (value !== undefined)
            reflectionMergePartial<UpdateProfileRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: UpdateProfileRequest): UpdateProfileRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.firstName = reader.string();
                    break;
                case  2:
                    message.lastName = reader.string();
                    break;
                case  3:
                    message.phone = reader.string();
                    break;
                case  4:
                    message.addressLine = reader.string();
                    break;
                case  5:
                    message.city = reader.string();
                    break;
                case  6:
                    message.state = reader.string();
                    break;
                case  7:
                    message.zip = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: UpdateProfileRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.firstName !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.firstName);
        
        if (message.lastName !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.lastName);
        
        if (message.phone !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.phone);
        
        if (message.addressLine !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.addressLine);
        
        if (message.city !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.city);
        
        if (message.state !== "")
            writer.tag(6, WireType.LengthDelimited).string(message.state);
        
        if (message.zip !== "")
            writer.tag(7, WireType.LengthDelimited).string(message.zip);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const UpdateProfileRequest = new UpdateProfileRequest$Type();

class SetAvatarRequest$Type extends MessageType<SetAvatarRequest> {
    constructor() {
        super("svyne.auth.SetAvatarRequest", [
            { no: 1, name: "images_id", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<SetAvatarRequest>): SetAvatarRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.imagesId = "";
        if (value !== undefined)
            reflectionMergePartial<SetAvatarRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: SetAvatarRequest): SetAvatarRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.imagesId = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: SetAvatarRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.imagesId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.imagesId);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const SetAvatarRequest = new SetAvatarRequest$Type();

class LoginRequest$Type extends MessageType<LoginRequest> {
    constructor() {
        super("svyne.auth.LoginRequest", [
            { no: 1, name: "email", kind: "scalar", T: 9  },
            { no: 2, name: "password", kind: "scalar", T: 9  },
            { no: 3, name: "tenant_slug", kind: "scalar", T: 9  },
            { no: 4, name: "portal", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<LoginRequest>): LoginRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.email = "";
        message.password = "";
        message.tenantSlug = "";
        message.portal = "";
        if (value !== undefined)
            reflectionMergePartial<LoginRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: LoginRequest): LoginRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.email = reader.string();
                    break;
                case  2:
                    message.password = reader.string();
                    break;
                case  3:
                    message.tenantSlug = reader.string();
                    break;
                case  4:
                    message.portal = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: LoginRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.email !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.email);
        
        if (message.password !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.password);
        
        if (message.tenantSlug !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.tenantSlug);
        
        if (message.portal !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.portal);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const LoginRequest = new LoginRequest$Type();

class SignUpRequest$Type extends MessageType<SignUpRequest> {
    constructor() {
        super("svyne.auth.SignUpRequest", [
            { no: 1, name: "email", kind: "scalar", T: 9  },
            { no: 2, name: "password", kind: "scalar", T: 9  },
            { no: 3, name: "first_name", kind: "scalar", T: 9  },
            { no: 4, name: "last_name", kind: "scalar", T: 9  },
            { no: 5, name: "tenant_slug", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<SignUpRequest>): SignUpRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.email = "";
        message.password = "";
        message.firstName = "";
        message.lastName = "";
        message.tenantSlug = "";
        if (value !== undefined)
            reflectionMergePartial<SignUpRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: SignUpRequest): SignUpRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.email = reader.string();
                    break;
                case  2:
                    message.password = reader.string();
                    break;
                case  3:
                    message.firstName = reader.string();
                    break;
                case  4:
                    message.lastName = reader.string();
                    break;
                case  5:
                    message.tenantSlug = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: SignUpRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.email !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.email);
        
        if (message.password !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.password);
        
        if (message.firstName !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.firstName);
        
        if (message.lastName !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.lastName);
        
        if (message.tenantSlug !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.tenantSlug);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const SignUpRequest = new SignUpRequest$Type();

class GoogleSignInRequest$Type extends MessageType<GoogleSignInRequest> {
    constructor() {
        super("svyne.auth.GoogleSignInRequest", [
            { no: 1, name: "google_token", kind: "scalar", T: 9  },
            { no: 2, name: "tenant_slug", kind: "scalar", T: 9  },
            { no: 3, name: "portal", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<GoogleSignInRequest>): GoogleSignInRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.googleToken = "";
        message.tenantSlug = "";
        message.portal = "";
        if (value !== undefined)
            reflectionMergePartial<GoogleSignInRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: GoogleSignInRequest): GoogleSignInRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.googleToken = reader.string();
                    break;
                case  2:
                    message.tenantSlug = reader.string();
                    break;
                case  3:
                    message.portal = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: GoogleSignInRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.googleToken !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.googleToken);
        
        if (message.tenantSlug !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.tenantSlug);
        
        if (message.portal !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.portal);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const GoogleSignInRequest = new GoogleSignInRequest$Type();

class RefreshTokenRequest$Type extends MessageType<RefreshTokenRequest> {
    constructor() {
        super("svyne.auth.RefreshTokenRequest", [
            { no: 1, name: "refresh_token", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<RefreshTokenRequest>): RefreshTokenRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.refreshToken = "";
        if (value !== undefined)
            reflectionMergePartial<RefreshTokenRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: RefreshTokenRequest): RefreshTokenRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.refreshToken = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: RefreshTokenRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.refreshToken !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.refreshToken);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const RefreshTokenRequest = new RefreshTokenRequest$Type();

class LogoutRequest$Type extends MessageType<LogoutRequest> {
    constructor() {
        super("svyne.auth.LogoutRequest", [
            { no: 1, name: "session_hash", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<LogoutRequest>): LogoutRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.sessionHash = "";
        if (value !== undefined)
            reflectionMergePartial<LogoutRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: LogoutRequest): LogoutRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.sessionHash = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: LogoutRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.sessionHash !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.sessionHash);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const LogoutRequest = new LogoutRequest$Type();

class MagicLinkRequest$Type extends MessageType<MagicLinkRequest> {
    constructor() {
        super("svyne.auth.MagicLinkRequest", [
            { no: 1, name: "email", kind: "scalar", T: 9  },
            { no: 2, name: "tenant_slug", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<MagicLinkRequest>): MagicLinkRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.email = "";
        message.tenantSlug = "";
        if (value !== undefined)
            reflectionMergePartial<MagicLinkRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: MagicLinkRequest): MagicLinkRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.email = reader.string();
                    break;
                case  2:
                    message.tenantSlug = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: MagicLinkRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.email !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.email);
        
        if (message.tenantSlug !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.tenantSlug);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const MagicLinkRequest = new MagicLinkRequest$Type();

class MagicLinkVerifyRequest$Type extends MessageType<MagicLinkVerifyRequest> {
    constructor() {
        super("svyne.auth.MagicLinkVerifyRequest", [
            { no: 1, name: "token", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<MagicLinkVerifyRequest>): MagicLinkVerifyRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.token = "";
        if (value !== undefined)
            reflectionMergePartial<MagicLinkVerifyRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: MagicLinkVerifyRequest): MagicLinkVerifyRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.token = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: MagicLinkVerifyRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.token !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.token);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const MagicLinkVerifyRequest = new MagicLinkVerifyRequest$Type();

class PasswordResetRequest$Type extends MessageType<PasswordResetRequest> {
    constructor() {
        super("svyne.auth.PasswordResetRequest", [
            { no: 1, name: "email", kind: "scalar", T: 9  },
            { no: 2, name: "tenant_slug", kind: "scalar", T: 9  },
            { no: 3, name: "origin", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<PasswordResetRequest>): PasswordResetRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.email = "";
        message.tenantSlug = "";
        message.origin = "";
        if (value !== undefined)
            reflectionMergePartial<PasswordResetRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: PasswordResetRequest): PasswordResetRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.email = reader.string();
                    break;
                case  2:
                    message.tenantSlug = reader.string();
                    break;
                case  3:
                    message.origin = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: PasswordResetRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.email !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.email);
        
        if (message.tenantSlug !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.tenantSlug);
        
        if (message.origin !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.origin);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const PasswordResetRequest = new PasswordResetRequest$Type();

class ValidateResetTokenRequest$Type extends MessageType<ValidateResetTokenRequest> {
    constructor() {
        super("svyne.auth.ValidateResetTokenRequest", [
            { no: 1, name: "token", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<ValidateResetTokenRequest>): ValidateResetTokenRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.token = "";
        if (value !== undefined)
            reflectionMergePartial<ValidateResetTokenRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ValidateResetTokenRequest): ValidateResetTokenRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.token = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: ValidateResetTokenRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.token !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.token);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const ValidateResetTokenRequest = new ValidateResetTokenRequest$Type();

class SetPasswordRequest$Type extends MessageType<SetPasswordRequest> {
    constructor() {
        super("svyne.auth.SetPasswordRequest", [
            { no: 1, name: "token", kind: "scalar", T: 9  },
            { no: 2, name: "new_password", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<SetPasswordRequest>): SetPasswordRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.token = "";
        message.newPassword = "";
        if (value !== undefined)
            reflectionMergePartial<SetPasswordRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: SetPasswordRequest): SetPasswordRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.token = reader.string();
                    break;
                case  2:
                    message.newPassword = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: SetPasswordRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.token !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.token);
        
        if (message.newPassword !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.newPassword);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const SetPasswordRequest = new SetPasswordRequest$Type();

class AuthResponse$Type extends MessageType<AuthResponse> {
    constructor() {
        super("svyne.auth.AuthResponse", [
            { no: 1, name: "access_token", kind: "scalar", T: 9  },
            { no: 2, name: "refresh_token", kind: "scalar", T: 9  },
            { no: 3, name: "expires_at", kind: "scalar", T: 3  },
            { no: 4, name: "user", kind: "message", T: () => UserProfile }
        ]);
    }
    create(value?: PartialMessage<AuthResponse>): AuthResponse {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.accessToken = "";
        message.refreshToken = "";
        message.expiresAt = "0";
        if (value !== undefined)
            reflectionMergePartial<AuthResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: AuthResponse): AuthResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.accessToken = reader.string();
                    break;
                case  2:
                    message.refreshToken = reader.string();
                    break;
                case  3:
                    message.expiresAt = reader.int64().toString();
                    break;
                case  4:
                    message.user = UserProfile.internalBinaryRead(reader, reader.uint32(), options, message.user);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: AuthResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.accessToken !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.accessToken);
        
        if (message.refreshToken !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.refreshToken);
        
        if (message.expiresAt !== "0")
            writer.tag(3, WireType.Varint).int64(message.expiresAt);
        
        if (message.user)
            UserProfile.internalBinaryWrite(message.user, writer.tag(4, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const AuthResponse = new AuthResponse$Type();

class UserProfile$Type extends MessageType<UserProfile> {
    constructor() {
        super("svyne.auth.UserProfile", [
            { no: 1, name: "users_id", kind: "scalar", T: 9  },
            { no: 2, name: "tenants_id", kind: "scalar", T: 9  },
            { no: 3, name: "email", kind: "scalar", T: 9  },
            { no: 4, name: "first_name", kind: "scalar", T: 9  },
            { no: 5, name: "last_name", kind: "scalar", T: 9  },
            { no: 6, name: "role", kind: "scalar", T: 5  },
            { no: 7, name: "tenant_slug", kind: "scalar", T: 9  },
            { no: 8, name: "email_verified", kind: "scalar", T: 8  },
            { no: 9, name: "avatar_url", kind: "scalar", T: 9  },
            { no: 10, name: "phone", kind: "scalar", T: 9  },
            { no: 11, name: "address_line", kind: "scalar", T: 9  },
            { no: 12, name: "city", kind: "scalar", T: 9  },
            { no: 13, name: "state", kind: "scalar", T: 9  },
            { no: 14, name: "zip", kind: "scalar", T: 9  },
            { no: 15, name: "google_connected", kind: "scalar", T: 8  }
        ]);
    }
    create(value?: PartialMessage<UserProfile>): UserProfile {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.usersId = "";
        message.tenantsId = "";
        message.email = "";
        message.firstName = "";
        message.lastName = "";
        message.role = 0;
        message.tenantSlug = "";
        message.emailVerified = false;
        message.avatarUrl = "";
        message.phone = "";
        message.addressLine = "";
        message.city = "";
        message.state = "";
        message.zip = "";
        message.googleConnected = false;
        if (value !== undefined)
            reflectionMergePartial<UserProfile>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: UserProfile): UserProfile {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.usersId = reader.string();
                    break;
                case  2:
                    message.tenantsId = reader.string();
                    break;
                case  3:
                    message.email = reader.string();
                    break;
                case  4:
                    message.firstName = reader.string();
                    break;
                case  5:
                    message.lastName = reader.string();
                    break;
                case  6:
                    message.role = reader.int32();
                    break;
                case  7:
                    message.tenantSlug = reader.string();
                    break;
                case  8:
                    message.emailVerified = reader.bool();
                    break;
                case  9:
                    message.avatarUrl = reader.string();
                    break;
                case  10:
                    message.phone = reader.string();
                    break;
                case  11:
                    message.addressLine = reader.string();
                    break;
                case  12:
                    message.city = reader.string();
                    break;
                case  13:
                    message.state = reader.string();
                    break;
                case  14:
                    message.zip = reader.string();
                    break;
                case  15:
                    message.googleConnected = reader.bool();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: UserProfile, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.usersId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.usersId);
        
        if (message.tenantsId !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.tenantsId);
        
        if (message.email !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.email);
        
        if (message.firstName !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.firstName);
        
        if (message.lastName !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.lastName);
        
        if (message.role !== 0)
            writer.tag(6, WireType.Varint).int32(message.role);
        
        if (message.tenantSlug !== "")
            writer.tag(7, WireType.LengthDelimited).string(message.tenantSlug);
        
        if (message.emailVerified !== false)
            writer.tag(8, WireType.Varint).bool(message.emailVerified);
        
        if (message.avatarUrl !== "")
            writer.tag(9, WireType.LengthDelimited).string(message.avatarUrl);
        
        if (message.phone !== "")
            writer.tag(10, WireType.LengthDelimited).string(message.phone);
        
        if (message.addressLine !== "")
            writer.tag(11, WireType.LengthDelimited).string(message.addressLine);
        
        if (message.city !== "")
            writer.tag(12, WireType.LengthDelimited).string(message.city);
        
        if (message.state !== "")
            writer.tag(13, WireType.LengthDelimited).string(message.state);
        
        if (message.zip !== "")
            writer.tag(14, WireType.LengthDelimited).string(message.zip);
        
        if (message.googleConnected !== false)
            writer.tag(15, WireType.Varint).bool(message.googleConnected);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const UserProfile = new UserProfile$Type();

export const AuthService = new ServiceType("svyne.auth.AuthService", [
    { name: "Login", options: {}, I: LoginRequest, O: AuthResponse },
    { name: "SignUp", options: {}, I: SignUpRequest, O: AuthResponse },
    { name: "GoogleSignIn", options: {}, I: GoogleSignInRequest, O: AuthResponse },
    { name: "RefreshToken", options: {}, I: RefreshTokenRequest, O: AuthResponse },
    { name: "Logout", options: {}, I: LogoutRequest, O: AckResponse },
    { name: "RequestMagicLink", options: {}, I: MagicLinkRequest, O: AckResponse },
    { name: "VerifyMagicLink", options: {}, I: MagicLinkVerifyRequest, O: AuthResponse },
    { name: "RequestPasswordReset", options: {}, I: PasswordResetRequest, O: AckResponse },
    { name: "ValidatePasswordResetToken", options: {}, I: ValidateResetTokenRequest, O: AckResponse },
    { name: "SetPassword", options: {}, I: SetPasswordRequest, O: AckResponse },
    { name: "Me", options: {}, I: Empty, O: UserProfile },
    { name: "UpdateProfile", options: {}, I: UpdateProfileRequest, O: UserProfile },
    { name: "SetAvatar", options: {}, I: SetAvatarRequest, O: UserProfile },
    { name: "LinkGoogle", options: {}, I: LinkGoogleRequest, O: UserProfile },
    { name: "UnlinkGoogle", options: {}, I: Empty, O: UserProfile }
]);
