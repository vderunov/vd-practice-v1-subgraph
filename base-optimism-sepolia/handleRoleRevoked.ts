import { Bytes } from "@graphprotocol/graph-ts";
import { RoleRevoked as RoleRevokedEvent } from "./generated/Whitelist/Whitelist";
import { Wallet } from "./generated/schema";

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  const id = event.params.account
  let entity = Wallet.load(id)
  if (entity == null) {
    entity = new Wallet(id)
  }

  entity.admin = (event.params.role == Bytes.fromHexString("0x0000000000000000000000000000000000000000000000000000000000000000")) ? false : entity.admin;
  entity.pending = (event.params.role == Bytes.fromHexString("0x70656e64696e6700000000000000000000000000000000000000000000000000")) ? false : entity.pending;
  entity.granted = (event.params.role == Bytes.fromHexString("0x6772616e74656400000000000000000000000000000000000000000000000000")) ? false : entity.granted;

  entity.save()
}