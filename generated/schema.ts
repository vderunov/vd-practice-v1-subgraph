// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal,
} from "@graphprotocol/graph-ts";

export class Wallet extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Wallet entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type Wallet must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("Wallet", id.toBytes().toHexString(), this);
    }
  }

  static loadInBlock(id: Bytes): Wallet | null {
    return changetype<Wallet | null>(
      store.get_in_block("Wallet", id.toHexString()),
    );
  }

  static load(id: Bytes): Wallet | null {
    return changetype<Wallet | null>(store.get("Wallet", id.toHexString()));
  }

  get id(): Bytes {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get admin(): boolean {
    let value = this.get("admin");
    if (!value || value.kind == ValueKind.NULL) {
      return false;
    } else {
      return value.toBoolean();
    }
  }

  set admin(value: boolean) {
    this.set("admin", Value.fromBoolean(value));
  }

  get pending(): boolean {
    let value = this.get("pending");
    if (!value || value.kind == ValueKind.NULL) {
      return false;
    } else {
      return value.toBoolean();
    }
  }

  set pending(value: boolean) {
    this.set("pending", Value.fromBoolean(value));
  }

  get granted(): boolean {
    let value = this.get("granted");
    if (!value || value.kind == ValueKind.NULL) {
      return false;
    } else {
      return value.toBoolean();
    }
  }

  set granted(value: boolean) {
    this.set("granted", Value.fromBoolean(value));
  }
}