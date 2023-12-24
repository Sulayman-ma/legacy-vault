'use client'

import { Web5Context } from "@/app/lib/Web5Context"
import { useContext, useState, useEffect, useMemo } from "react"
import RecordsTable from "@/app/components/records-table"
import { Suspense } from "react";
import { PhraseTableSkeleton } from "@/app/components/skeletons";
import { VerifiableCredential } from "@web5/credentials";

export default function Vault() {

  // using global web5 context
  const { web5 } = useContext(Web5Context)
  const [allRecords, setAllRecords] = useState([])
  const [allCredentials, setAllCredentials] = useState([])

  useEffect(() => {
    if (!web5) return;
    const intervalId = setInterval(async () => {
      await getPhrases(web5)
      await getCredentials(web5)
    }, 2000);

    return () => clearInterval(intervalId);
  }, [web5]);

  const getPhrases = async (web5) => {
    const response = await web5.dwn.records.query({
      message: {
        filter: {
          protocol: "https://legacy-vault/protocol",
          schema: "https://legacy-vault/pass-phrase",
        },
      },
    });

    if (response.status.code === 200) {
      const phrases = await Promise.all(
        response.records.map(async (record) => {
          const data = await record.data.json();
          const details = [data.platform, data.account_name]
          return details;
        })
      );
      setAllRecords(phrases)
    } else {
      console.log("error", response.status);
    }
  };

  const getCredentials = async (web5) => {
    const response = await web5.dwn.records.query({
      message: {
        filter: {
          protocol: "https://legacy-vault/protocol",
          schema: "https://legacy-vault/credential",
          dataFormat: 'text/plain'
        },
      },
    });

    if (response.status.code === 200) {
      const titles = await Promise.all(
        response.records.map(async (record) => {
          const signedJwt = await record.data.text();
          const vc = VerifiableCredential.parseJwt({ vcJwt: signedJwt }).vcDataModel
          const details = [vc.type[1].toUpperCase(), vc.credentialSubject.title]
          return details;
        })
      );
      console.info(titles)
      setAllCredentials(titles)
    } else {
      console.log("error", response.status);
    }
  };

  return(
    <RecordsTable 
      phrases={allRecords}
      credentials={allCredentials}
    />
  )
}
