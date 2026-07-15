import { Document, Page, Text, View, Image, Link, StyleSheet } from "@react-pdf/renderer";
import { timelineEntries } from "@/lib/content/timeline";
import { toolGroups } from "@/lib/content/tools";
import { cvHeader, cvSummary, cvSelectedWork, cvEducationDetail } from "./cvData";

const ACCENT = "#c0673c";
const TEXT = "#2b2823";
const MUTED = "#6b6459";
const FAINT = "#9a9284";
const BORDER = "#e4ddcf";

const styles = StyleSheet.create({
  page: {
    padding: "36pt 40pt",
    fontFamily: "Helvetica",
    fontSize: 9.5,
    color: TEXT,
    lineHeight: 1.5,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  photoWrap: {
    width: 54,
    height: 54,
    borderRadius: 10,
    overflow: "hidden",
    flexShrink: 0,
  },
  photo: {
    width: 54,
    height: 54,
    objectFit: "cover",
  },
  headerText: {
    marginLeft: 14,
    flexShrink: 1,
  },
  name: {
    fontFamily: "Helvetica-Bold",
    fontSize: 22,
    color: TEXT,
  },
  title: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10.5,
    color: ACCENT,
    marginTop: 3,
  },
  meta: {
    fontSize: 8.5,
    color: FAINT,
    marginTop: 4,
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    marginBottom: 14,
  },
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    color: FAINT,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 7,
    marginTop: 16,
  },
  paragraph: {
    color: MUTED,
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: BORDER,
    paddingVertical: 6,
  },
  rowDate: {
    width: 92,
    fontSize: 8,
    color: FAINT,
    flexShrink: 0,
  },
  rowBody: {
    flex: 1,
  },
  rowRole: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9.5,
    color: TEXT,
  },
  rowCompany: {
    fontSize: 9,
    color: MUTED,
    marginTop: 1,
  },
  eduTag: {
    fontSize: 6.5,
    fontFamily: "Helvetica-Bold",
    color: ACCENT,
    marginLeft: 5,
  },
  workItem: {
    marginBottom: 8,
  },
  workTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9.5,
    color: TEXT,
  },
  workDetail: {
    color: MUTED,
    marginTop: 2,
  },
  toolGroupRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  toolGroupName: {
    width: 130,
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
    color: TEXT,
    flexShrink: 0,
  },
  toolGroupList: {
    flex: 1,
    fontSize: 8.5,
    color: MUTED,
  },
  footer: {
    position: "absolute",
    bottom: 28,
    left: 40,
    right: 40,
    fontSize: 7.5,
    color: FAINT,
    textAlign: "center",
  },
  link: {
    color: ACCENT,
    textDecoration: "none",
  },
});

export function CVDocument({ photoSrc }: { photoSrc: string }) {
  return (
    <Document title={`${cvHeader.name} — CV`} author={cvHeader.name}>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <View style={styles.photoWrap}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image src={photoSrc} style={styles.photo} />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.name}>{cvHeader.name}</Text>
            <Text style={styles.title}>{cvHeader.title}</Text>
            <Text style={styles.meta}>
              {cvHeader.location} · {cvHeader.linkedin} · {cvHeader.site}
            </Text>
          </View>
        </View>
        <View style={styles.hr} />

        <Text style={styles.sectionTitle}>Summary</Text>
        <Text style={styles.paragraph}>{cvSummary}</Text>

        <Text style={styles.sectionTitle}>Experience &amp; Education</Text>
        {timelineEntries.map((entry, i) => (
          <View key={i} style={styles.row} wrap={false}>
            <Text style={styles.rowDate}>{entry.date}</Text>
            <View style={styles.rowBody}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.rowRole}>{entry.role}</Text>
                {entry.isEducation && <Text style={styles.eduTag}>EDU</Text>}
              </View>
              <Text style={styles.rowCompany}>{entry.name}</Text>
            </View>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Selected Work</Text>
        {cvSelectedWork.map((item, i) => (
          <View key={i} style={styles.workItem} wrap={false}>
            <Text style={styles.workTitle}>{item.title}</Text>
            <Text style={styles.workDetail}>{item.detail}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Education Detail</Text>
        {cvEducationDetail.map((item, i) => (
          <View key={i} style={styles.workItem} wrap={false}>
            <Text style={styles.workTitle}>{item.school}</Text>
            <Text style={styles.workDetail}>{item.detail}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Core Tools &amp; Platforms</Text>
        {toolGroups.map((group) => (
          <View key={group.name} style={styles.toolGroupRow} wrap={false}>
            <Text style={styles.toolGroupName}>{group.name}</Text>
            <Text style={styles.toolGroupList}>{group.tools.join(", ")}</Text>
          </View>
        ))}

        <Text style={styles.footer}>
          Generated from <Link src={`https://${cvHeader.site}`} style={styles.link}>{cvHeader.site}</Link> — an interactive,
          AI-assistant-style portfolio. Ask it anything.
        </Text>
      </Page>
    </Document>
  );
}
