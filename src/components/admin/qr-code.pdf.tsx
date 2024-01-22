import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { QRCodeSVG } from "qrcode.react";
import { PDFViewer } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

type Props = {
  petTags: { registrationCode: string; qrCode: string }[];
};

export const MyDocument = (props: Props) => {
  return (
    <PDFViewer className="h-96">
      <Document>
        {props.petTags.map((petTag, idx) => (
          <Page size="A4" style={styles.page} key={idx}>
            <View style={styles.section}>
              <Text>Registration Code: {petTag.registrationCode}</Text>
              {/* <Svg style={{ width: 400, height: 400, backgroundColor: "red" }}> */}
              <QRCodeSVG
                value={"https://findmypet.in/pet-tags/" + petTag.qrCode}
                size={200}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"L"}
                includeMargin={false}
                imageSettings={{
                  src: "/find-my-pet-logo-white.svg",
                  x: undefined,
                  y: undefined,
                  height: 24,
                  width: 24,
                  excavate: true,
                }}
              />
              {/* </Svg> */}
            </View>
          </Page>
        ))}
      </Document>
    </PDFViewer>
  );
};
