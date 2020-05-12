'use strict'

const IPFS = require('ipfs')
const all = require('it-all')

async function main () {
  const node = await IPFS.create()
  const version = await node.version()

  console.log('Version:', version.version)
}

main()