import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
} from "matchstick-as/assembly/index"
import {Bytes, Address} from "@graphprotocol/graph-ts"
import {handleRoleGranted, handleRoleRevoked} from "../src/whitelist"
import {createRoleGrantedEvent, createRoleRevokedEvent} from "./whitelist-utils"

const PENDING_ROLE = "0x70656e64696e6700000000000000000000000000000000000000000000000000";
const GRANTED_ROLE = "0x6772616e74656400000000000000000000000000000000000000000000000000";

const address = "0x1234567890123456789012345678901234567890";
const address2 = "0x1234567890123456789012345678901234567891";

describe("handleRoleGranted()", () => {
  describe("Role change events handling", () => {
    beforeAll(() => {
      clearStore()
    })

    test("Account status set to 'pending' after role granted", () => {
      const newRoleAdminChangedEvent = createRoleGrantedEvent(
        Bytes.fromHexString(PENDING_ROLE),
        Address.fromString(address),
        Address.fromString(address)
      )
      handleRoleGranted(newRoleAdminChangedEvent)
      assert.entityCount("Wallet", 1)
      assert.fieldEquals("Wallet", address, "granted", "false")
      assert.fieldEquals("Wallet", address, "admin", "false")
      assert.fieldEquals("Wallet", address, "pending", "true")
    })

    test("Account status set to 'granted' after role granted", () => {
      const newRoleAdminChangedEvent = createRoleGrantedEvent(
        Bytes.fromHexString(GRANTED_ROLE),
        Address.fromString(address2),
        Address.fromString(address2)
      )
      handleRoleGranted(newRoleAdminChangedEvent)
      assert.entityCount("Wallet", 2)
      assert.fieldEquals("Wallet", address2, "granted", "true")
      assert.fieldEquals("Wallet", address2, "admin", "false")
      assert.fieldEquals("Wallet", address2, "pending", "false")
    })
  })

  describe("Changing a role of account from 'pending' to 'granted'", () => {
    beforeAll(() => {
      clearStore()
    })

    test("Account status set to 'pending' after role granted", () => {
      const newRoleAdminChangedEvent = createRoleGrantedEvent(
        Bytes.fromHexString(PENDING_ROLE),
        Address.fromString(address),
        Address.fromString(address)
      )
      handleRoleGranted(newRoleAdminChangedEvent)
      assert.entityCount("Wallet", 1)
      assert.fieldEquals("Wallet", address, "granted", "false")
      assert.fieldEquals("Wallet", address, "admin", "false")
      assert.fieldEquals("Wallet", address, "pending", "true")
    })

    test("Account status set to 'granted' after role granted", () => {
      const newRoleAdminChangedEvent = createRoleGrantedEvent(
        Bytes.fromHexString(GRANTED_ROLE),
        Address.fromString(address),
        Address.fromString(address)
      )
      handleRoleGranted(newRoleAdminChangedEvent)
      assert.entityCount("Wallet", 1)
      assert.fieldEquals("Wallet", address, "granted", "true")
      assert.fieldEquals("Wallet", address, "admin", "false")
      assert.fieldEquals("Wallet", address, "pending", "false")
    })
  })
})

describe('handleRoleRevoked()', () => {
  beforeAll(() => {
    clearStore()
  })

  test("Revoke 'pending' role", () => {
    const newRoleAdminChangedEvent = createRoleGrantedEvent(
      Bytes.fromHexString(PENDING_ROLE),
      Address.fromString(address),
      Address.fromString(address)
    )
    handleRoleGranted(newRoleAdminChangedEvent)

    assert.fieldEquals("Wallet", address, "pending", "true")

    const newRoleRevokedEvent = createRoleRevokedEvent(
      Bytes.fromHexString(PENDING_ROLE),
      Address.fromString(address),
      Address.fromString(address)
    )
    handleRoleRevoked(newRoleRevokedEvent)
    assert.entityCount("Wallet", 1)

    assert.fieldEquals("Wallet", address, "granted", "false")
    assert.fieldEquals("Wallet", address, "admin", "false")
    assert.fieldEquals("Wallet", address, "pending", "false")
  })

  test("Revoke 'granted' role", () => {
    const newRoleAdminChangedEvent = createRoleGrantedEvent(
      Bytes.fromHexString(GRANTED_ROLE),
      Address.fromString(address),
      Address.fromString(address)
    )
    handleRoleGranted(newRoleAdminChangedEvent)

    assert.fieldEquals("Wallet", address, "granted", "true")

    const newRoleRevokedEvent = createRoleRevokedEvent(
      Bytes.fromHexString(GRANTED_ROLE),
      Address.fromString(address),
      Address.fromString(address)
    )
    handleRoleRevoked(newRoleRevokedEvent)
    assert.entityCount("Wallet", 1)

    assert.fieldEquals("Wallet", address, "granted", "false")
    assert.fieldEquals("Wallet", address, "admin", "false")
    assert.fieldEquals("Wallet", address, "pending", "false")
  })
})
