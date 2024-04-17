import { assert } from 'matchstick-as';
import { createRoleGrantedEvent } from "./event-factories/createRoleGrantedEvent";
import { address, GRANTED_ROLE, PENDING_ROLE } from "./constants";
import { Address, Bytes } from "@graphprotocol/graph-ts";
import { handleRoleGranted } from "../base-optimism-sepolia";

export default function test(): void {
  const newRolePendingChangedEvent = createRoleGrantedEvent(
    Bytes.fromHexString(PENDING_ROLE),
    Address.fromString(address),
    Address.fromString(address)
  )
  handleRoleGranted(newRolePendingChangedEvent)
  assert.entityCount("Wallet", 1)
  assert.fieldEquals("Wallet", address, "granted", "false")
  assert.fieldEquals("Wallet", address, "admin", "false")
  assert.fieldEquals("Wallet", address, "pending", "true")

  const newRoleGrantedChangedEvent = createRoleGrantedEvent(
    Bytes.fromHexString(GRANTED_ROLE),
    Address.fromString(address),
    Address.fromString(address)
  )
  handleRoleGranted(newRoleGrantedChangedEvent)
  assert.entityCount("Wallet", 1)
  assert.fieldEquals("Wallet", address, "granted", "true")
  assert.fieldEquals("Wallet", address, "admin", "false")
  assert.fieldEquals("Wallet", address, "pending", "true")
}