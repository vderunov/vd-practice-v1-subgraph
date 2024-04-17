import { assert } from "matchstick-as";
import { createRoleGrantedEvent } from "./event-factories/createRoleGrantedEvent";
import { createRoleRevokedEvent } from "./event-factories/createRoleRevokedEvent";
import { Address, Bytes } from "@graphprotocol/graph-ts";
import { address, GRANTED_ROLE, PENDING_ROLE } from "./constants";
import { handleRoleGranted, handleRoleRevoked } from "../base-optimism-sepolia";

export default function test(): void {
  const newRolePendingChangedEvent = createRoleGrantedEvent(
    Bytes.fromHexString(PENDING_ROLE),
    Address.fromString(address),
    Address.fromString(address)
  )
  handleRoleGranted(newRolePendingChangedEvent)

  assert.fieldEquals("Wallet", address, "pending", "true")

  const newPendingRoleRevokedEvent = createRoleRevokedEvent(
    Bytes.fromHexString(PENDING_ROLE),
    Address.fromString(address),
    Address.fromString(address)
  )
  handleRoleRevoked(newPendingRoleRevokedEvent)
  assert.entityCount("Wallet", 1)
  assert.fieldEquals("Wallet", address, "granted", "false")
  assert.fieldEquals("Wallet", address, "admin", "false")
  assert.fieldEquals("Wallet", address, "pending", "false")

  const newRoleGrantedChangedEvent = createRoleGrantedEvent(
    Bytes.fromHexString(GRANTED_ROLE),
    Address.fromString(address),
    Address.fromString(address)
  )
  handleRoleGranted(newRoleGrantedChangedEvent)

  assert.fieldEquals("Wallet", address, "granted", "true")

  const newGrantedRoleRevokedEvent = createRoleRevokedEvent(
    Bytes.fromHexString(GRANTED_ROLE),
    Address.fromString(address),
    Address.fromString(address)
  )
  handleRoleRevoked(newGrantedRoleRevokedEvent)
  assert.entityCount("Wallet", 1)
  assert.fieldEquals("Wallet", address, "granted", "false")
  assert.fieldEquals("Wallet", address, "admin", "false")
  assert.fieldEquals("Wallet", address, "pending", "false")
}