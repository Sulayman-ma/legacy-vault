import { VerifiableCredential } from "@web5/credentials";
import { DidIonMethod } from "@web5/dids";
import { legacyVaultProtocol as lvp } from "./protocols";

export async function addCredential(web5, vcData) {
  try {
    const portableDid = await DidIonMethod.create()
    const didString = portableDid.did
    const { type, subject, ...rest } = vcData
    // create VC object
    const vc = await VerifiableCredential.create({
      type: type,
      issuer: didString,
      subject: subject === 'self' ? didString : subject,
      data: rest
    });

    console.info(vc)

    // sign VC with portable DID
    const signedVcJwt = await vc.sign({ did: portableDid })

    console.info('Signed VC', signedVcJwt)

    // create record for signed VC and store here
    const { record } = await web5.dwn.records.create({
      data: {
        group: type,
        payload: signedVcJwt,
      },
      message: {
        protocol: lvp.protocol,
        protocolPath: "credential",
        schema: lvp.types.credential.schema,
        dataFormat: 'application/json'
      }
    })
    console.info(await record.data.json())
    return record
  } catch (error) {
    console.error('Add credential failed:', error)
    throw new Error('Failed to add entry')
  }
}

export async function addSecret(web5, recordData) {
  try {
    const response = await web5.dwn.records.create({
      data: {
        group: 'Secret',
        payload: recordData,
      },
      message: {
        protocol: lvp.protocol,
        protocolPath: "pass",
        schema: lvp.types.pass.schema,
        dataFormat: 'application/json'
      }
    })

    return response
  } catch (error) {
    console.error('Add pass failed:', error)
    throw new Error('Failed to add entry')
  }
}

export async function addBeneficiary(web5, recordData) {
  try {
    const response = await web5.dwn.records.create({
      data: recordData,
      message: {
        protocol: lvp.protocol,
        protocolPath: "beneficiary",
        schema: lvp.types.beneficiary.schema,
        dataFormat: 'application/json'
      }
    })

    return response
  } catch (error) {
    console.error('Add beneficiary failed:', error)
    throw new Error('Failed to add beneficiary')
  }
}

export async function getSecrets(web5) {
  try {
    const response = await web5.dwn.records.query({
      message: {
        filter: {
          protocol: lvp.protocol,
          schema: lvp.types.pass.schema,
        },
      },
    });
  
    if (response.status.code === 200) {
      const phrases = await Promise.all(
        response.records.map(async (record) => {
          const dwnData = await record.data.json();
          const payload = dwnData.payload;
          const details = {
            group: dwnData.group,
            recordId: record.id,
            platform: payload.platform,
            account_name: payload.account_name,
            phrase: payload.phrase,
          }
          return details;
        })
      );
      return phrases
    }
  } catch (error) {
    console.error('Failed to fetch passes:', error)
  }
}

export async function getCredentials(web5) {
  try {
    const response = await web5.dwn.records.query({
      message: {
        filter: {
          protocol: "https://legacy-vault/protocol",
          schema: "https://legacy-vault/credential",
          dataFormat: 'application/json'
        },
      },
    });
  
    if (response.status.code === 200) {
      const docs = await Promise.all(
        // retrieve payload and other necessary data for the credentials
        response.records.map(async (record) => {
          const dwnData = await record.data.json();
          const signedJwt = dwnData.payload
          const vc = VerifiableCredential.parseJwt({ vcJwt: signedJwt })
          const details = {
            recordId: record.id,
            group: dwnData.group,
            type: vc.type,
            claim: vc.vcDataModel.credentialSubject,          
          }
          return details;
        })
      );
      return docs
      }
  } catch (error) {
    console.error('Failed to fetch credentials:', error)
  }
}

export async function getAssets(web5) {
  try {
    const credentials = await getCredentials(web5)
    const secrets = await getSecrets(web5)
    const assets = [...credentials, ...secrets]
  
    const renderData = assets.reduce((acc, asset) => {
      let match = acc.find(group => group.group === asset.group)
      // create group if it does not exist
      if (!match) {
        match = {group: asset.group, records: []}
        acc.push(match)
      }
      // add data to corresponding group's records array
      match.records.push(asset)
      return acc;
    }, [])
    // console.log(renderData);
    return renderData
  } catch (error) {
    console.error('Failed to get assets:', error)
    // throw new Error('Failed to fetch assets')
  }
}

export async function getBeneficiaries(web5) {
  try {
    const response = await web5.dwn.records.query({
      message: {
        filter: {
          protocol: lvp.protocol,
          schema: lvp.types.beneficiary.schema,
        },
      },
    });
  
    if (response.status.code === 200) {
      const beneficiaries = await Promise.all(
        response.records.map(async (record) => {
          const payload = await record.data.json();
          const details = {
            recordId: record.id,
            name: payload.benName,
            relationship: payload.benRelationship,
            did: payload.benDid,
          }
          return details;
        })
      );
      return beneficiaries
    }
  } catch (error) {
    console.error('Failed to get beneficiaries:', error)
    // throw new Error('Failed to get beneficiaries')
  }
}

export async function getCredential(web5, recordId) {
  try {
    const { record } = await web5.dwn.records.read({
      message: {
        fitler: {
          recordId: recordId
        }
      }
    })

    if (record) {
      const dwnData = await response.record.data.json()
      const signedJwt = dwnData.payload
      const vc = VerifiableCredential.parseJwt({ vcJwt: signedJwt })
      const details = {
        recordId: record.id,
        group: dwnData.group,
        type: vc.vcDataModel.type[1],
        claim: vc.vcDataModel.credentialSubject,          
      }
      return details;
    } else {
      console.error('Get credential failed:', error)
        throw new Error('Credential not found')
    }
  } catch (error) {
    console.error('Get credential failed:', error)
    throw new Error('Failed to get credential')
  }
}

export async function deleteRecord(web5, recordId) {
  try {
    const response = await web5.dwn.records.delete({
      message: {
        recordId: recordId
      },
    });
  
    return response
  } catch (error) {
    console.error('Delete record failed:', error)
    throw new Error('Failed to delete record')
  }
}
