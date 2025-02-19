import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  subheader: {
    fontSize: 16,
    marginBottom: 10,
    color: "#555",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#f0f0f0",
    padding: 5,
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
  },
  text: {
    fontSize: 12,
  },
});

// Invoice Component
const InvoicePDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <Text style={styles.header}>INVOICE</Text>

      {/* Invoice Details */}
      <Text style={styles.subheader}>Invoice Number: {data.invoiceNumber}</Text>
      <Text style={styles.subheader}>Date: {data.date}</Text>

      {/* From and To */}
      <Text style={styles.subheader}>From:</Text>
      <Text style={styles.text}>{data.from.name}</Text>
      <Text style={styles.text}>{data.from.address}</Text>
      <Text style={styles.text}>{data.from.email}</Text>

      <Text style={styles.subheader}>To:</Text>
      <Text style={styles.text}>{data.to.name}</Text>
      <Text style={styles.text}>{data.to.address}</Text>
      <Text style={styles.text}>{data.to.email}</Text>

      {/* Items Table */}
      <Text style={styles.subheader}>Payment Details:</Text>
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text>#</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text>Service Name</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text>Quantity</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text>Price</Text>
          </View>
        </View>

        {/* Table Rows */}
        {data.items.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}>
              <Text>{index + 1}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>{item.description}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>{item.quantity}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>{item.price}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Total Price */}
      <Text style={styles.subheader}>Total Price: {data.totalPrice}</Text>

      {/* Payment Info */}
      <Text style={styles.subheader}>Payment Info:</Text>
      <Text style={styles.text}>Total Amount: {data.paymentInfo.totalAmount}</Text>
      <Text style={styles.text}>Discount: {data.paymentInfo.discount}</Text>
      <Text style={styles.text}>Gross Amount: {data.paymentInfo.grossAmount}</Text>
      <Text style={styles.text}>Paid: {data.paymentInfo.paid}</Text>
      <Text style={styles.text}>Due: {data.paymentInfo.due}</Text>
      <Text style={styles.text}>Payment Status: {data.paymentInfo.paymentStatus}</Text>
    </Page>
  </Document>
);

export default InvoicePDF;