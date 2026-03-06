import React, { useState } from "react";
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Alert, Modal, SafeAreaView } from "react-native";
import IonIcons from "@react-native-vector-icons/ionicons";
import { Camera, useCameraDevices, useCodeScanner } from "react-native-vision-camera";
import colors from "../../constants/Colors";
import CustomButton from "../../components/CustomBotton/CustomButton";
import HeadingText from "../../components/HeadingText";

interface Device {
  id: string;
  name: string;
  model: string;
  lastUsed: string;
  isCurrent: boolean;
}

const LinkDeviceScreen = () => {
  const [devices, setDevices] = useState<Device[]>([
    { id: "1", name: "Moses' iPhone 15", model: "iOS Device", lastUsed: "Active now", isCurrent: true },
  ]);
  const [isScannerVisible, setIsScannerVisible] = useState(false);

  // --- CAMERA LOGIC ---
  const devicesList = useCameraDevices();
  const device = devicesList.find((d) => d.position === "back");

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: (codes) => {
      if (codes.length > 0 && isScannerVisible) {
        setIsScannerVisible(false);
        // Simulate linking the new device found in the QR
        handleLinkSuccess("New Office Tablet");
      }
    }
  });

  const handleLinkSuccess = (deviceName: string) => {
    const newDevice: Device = {
      id: Math.random().toString(),
      name: deviceName,
      model: "Android Tablet",
      lastUsed: "Just now",
      isCurrent: false,
    };
    setDevices((prev) => [...prev, newDevice]);
    Alert.alert("Success", `${deviceName} has been linked to your account.`);
  };

  const renderDeviceItem = ({ item }: { item: Device }) => (
    <View style={styles.deviceCard}>
      <View style={styles.deviceInfo}>
        <View style={styles.iconBackground}>
          <IonIcons 
            name={"laptop"} 
            size={24} 
            color={colors.black} 
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.deviceName}>{item.name}</Text>
          <Text style={styles.deviceModel}>{item.model} • {item.lastUsed}</Text>
        </View>
      </View>
      {!item.isCurrent && <Text style={styles.removeText}>Unlink</Text>}
    </View>
  );

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <HeadingText text="Linked Devices" />
        <Text style={styles.subHeading}>Scan the QR code on your other device to link it.</Text>
      </View>

      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={renderDeviceItem}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.footer}>
        <CustomButton title="Link a device" onPress={() => setIsScannerVisible(true)} />
      </View>

      {/* --- SCANNER MODAL --- */}
      <Modal visible={isScannerVisible} animationType="slide" transparent={false}>
        <SafeAreaView style={styles.scannerContainer}>
          <View style={styles.scannerHeader}>
            <TouchableOpacity onPress={() => setIsScannerVisible(false)}>
              <IonIcons name="close" size={30} color={colors.white} />
            </TouchableOpacity>
            <Text style={styles.scannerTitle}>Scan QR Code</Text>
            <View style={{ width: 30 }} /> 
          </View>

          {device ? (
            <Camera
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={isScannerVisible}
              codeScanner={codeScanner}
            />
          ) : (
            <View style={styles.cameraError}>
              <Text style={{color: '#fff'}}>Camera not available</Text>
            </View>
          )}

          {/* Overlay Guide */}
          <View style={styles.overlay}>
             <View style={styles.unfocusedContainer}></View>
             <View style={styles.focusedContainer}>
                <View style={styles.cornerTopLeft} />
                <View style={styles.cornerTopRight} />
                <View style={styles.cornerBottomLeft} />
                <View style={styles.cornerBottomRight} />
             </View>
             <View style={styles.unfocusedContainer}>
                <Text style={styles.guideText}>Align QR code within the frame</Text>
             </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: colors.white },
  header: { padding: 20 },
  subHeading: { color: "#666", marginTop: 5 },
  listContent: { paddingHorizontal: 20 },
  deviceCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F9F9F9",
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
  },
  deviceInfo: { flexDirection: "row", alignItems: "center" },
  iconBackground: { width: 45, height: 45, borderRadius: 12, backgroundColor: "#eee", justifyContent: "center", alignItems: "center" },
  textContainer: { marginLeft: 15 },
  deviceName: { fontSize: 16, fontWeight: "600" },
  deviceModel: { fontSize: 12, color: "#888" },
  removeText: { color: "#FF5252", fontWeight: "500" },
  footer: { padding: 20, borderTopWidth: 1, borderColor: '#eee' },
  
  /* Scanner Styles */
  scannerContainer: { flex: 1, backgroundColor: colors.black },
  scannerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    zIndex: 10,
  },
  scannerTitle: { color: colors.white, fontSize: 18, fontWeight: '600' },
  cameraError: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unfocusedContainer: { flex: 1, width: '100%', backgroundColor: 'rgba(0,0,0,0.5)' },
  focusedContainer: {
    width: 250,
    height: 250,
    backgroundColor: 'transparent',
  },
  guideText: { color: '#fff', textAlign: 'center', marginTop: 20, fontSize: 14 },
  /* Corner accents for the scanner frame */
  cornerTopLeft: { position: 'absolute', top: 0, left: 0, width: 40, height: 40, borderTopWidth: 4, borderLeftWidth: 4, borderColor: colors.white },
  cornerTopRight: { position: 'absolute', top: 0, right: 0, width: 40, height: 40, borderTopWidth: 4, borderRightWidth: 4, borderColor: colors.white },
  cornerBottomLeft: { position: 'absolute', bottom: 0, left: 0, width: 40, height: 40, borderBottomWidth: 4, borderLeftWidth: 4, borderColor: colors.white },
  cornerBottomRight: { position: 'absolute', bottom: 0, right: 0, width: 40, height: 40, borderBottomWidth: 4, borderRightWidth: 4, borderColor: colors.white },
});

export default LinkDeviceScreen;