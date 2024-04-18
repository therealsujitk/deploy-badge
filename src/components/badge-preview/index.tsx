import { Card } from "@mui/joy";

function BadgePreview(props: { src?: string }) {
  return (
    <Card>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <span style={{alignSelf: 'center'}}>Badge Preview</span>
        {/* eslint-disable @next/next/no-img-element */}
        <img src={props.src} alt="Badge Preview" style={{alignSelf: 'center'}} />
      </div>
    </Card>
  );
}

export default BadgePreview;
