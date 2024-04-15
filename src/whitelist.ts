import {
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent
} from "../generated/Whitelist/Whitelist"
import {Wallet} from "../generated/schema"
import {Bytes} from "@graphprotocol/graph-ts";

export function handleRoleGranted(event: RoleGrantedEvent): void {
  const id = event.params.account
  let entity = Wallet.load(id)
  if (entity == null) {
    entity = new Wallet(id)
  }

  entity.admin = event.params.role == Bytes.fromHexString("0x0000000000000000000000000000000000000000000000000000000000000000")
  entity.pending = event.params.role == Bytes.fromHexString("0x70656e64696e6700000000000000000000000000000000000000000000000000")
  entity.granted = event.params.role == Bytes.fromHexString("0x6772616e74656400000000000000000000000000000000000000000000000000")

  entity.save()
}

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  const id = event.params.account
  let entity = Wallet.load(id)
  if (entity == null) {
    entity = new Wallet(id)
  }

  entity.admin = false
  entity.pending = false
  entity.granted = false

  entity.save()
}

