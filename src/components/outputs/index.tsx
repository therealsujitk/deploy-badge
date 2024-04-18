'use client'

import { useEffect, useState } from "react";
import { BadgePreview, OutputField } from "..";

function Outputs({label, badgeUrl}: {label: string; badgeUrl: URL}) {
  const [badgePreview, setBadgePreview] = useState<string>(badgeUrl.toString());

  useEffect(() => {
    const timeout = setTimeout(() => setBadgePreview(badgeUrl.toString()), 500);
    return () => clearTimeout(timeout);
  }, [badgeUrl]);

  const outputs = [
    badgeUrl.toString(),
    `![${label} Deploy](${badgeUrl})`,
    `<img src="${badgeUrl}" alt="${label} Deploy"></img>`,
  ];

  return (
    <section>
      <BadgePreview src={badgePreview} />
      {outputs.map((o, i) => <OutputField key={i} value={o} />)}
    </section>
  );
}

export default Outputs;
