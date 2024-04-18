import { Card } from "@mui/joy";

function BadgePreview(props: { src?: string }) {
  return (
    <Card>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <span style={{alignSelf: 'center'}}>Badge Preview</span>
        <img src={props.src} alt="Badge Preview" style={{alignSelf: 'center'}} />
      </div>
    </Card>
  );
}

export default BadgePreview;
