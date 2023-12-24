export async function createProtocolDefinition() {
  const legacyVaultProtocol = {
    protocol: "https://legacy-vault/protocol",
    published: true,
    types: {
      pass: {
        schema: "https://legacy-vault/pass-phrase",
        dataFormats: ["application/json"],
      },
      credential: {
        schema: "https://legacy-vault/credential",
        dataFormats: ['text/plain']
      }
    },
    structure: {
      pass: {
        $actions: [
          { who: "author", of: "pass", can: "read" },
          { who: "author", of: "pass", can: "write" },
        ],
      },
      credential: {
        $actions: [
          { who: "author", of: "credential", can: "write" },
          { who: "anyone", can: "read" },
        ]
      }
    }
  }

  return legacyVaultProtocol
}

export async function queryForProtocol(web5) {
  return await web5.dwn.protocols.query({
    message: {
      filter: {
        protocol: "https://legacy-vault/protocol",
      },
    },
  });
}

export async function installProtocolLocally(web5, protocolDefinition) {
  return await web5.dwn.protocols.configure({
    message: {
      definition: protocolDefinition,
    },
  });
}

export async function configureProtocol(web5) {
  const protocolDefinition = await createProtocolDefinition();

  const { protocols: localProtocol, status: localProtocolStatus } =
    await queryForProtocol(web5);
  if (localProtocolStatus.code !== 200 || localProtocol.length === 0) {

    const { protocol, status } = await installProtocolLocally(web5, protocolDefinition);
    console.log("Protocol installed locally", protocol, status);

    const { status: configureRemoteStatus } = await protocol.send();
    console.log("Did the protocol install on the remote DWN?", configureRemoteStatus);
  } else {
    console.log("Protocol already installed");
  }
}
