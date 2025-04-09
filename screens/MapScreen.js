// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import { request, PERMISSIONS } from 'react-native-permissions';

// const MapScreen = () => {
//   const [region, setRegion] = useState({
//     latitude: 24.8607,
//     longitude: 67.0011,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   });

//   useEffect(() => {
//     requestLocationPermission();
//   }, []);

//   const requestLocationPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           getCurrentLocation();
//         }
//       } catch (err) {
//         console.warn(err);
//       }
//     } else {
//       request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
//         .then(result => {
//           if (result === 'granted') {
//             getCurrentLocation();
//           }
//         });
//     }
//   };

//   const getCurrentLocation = () => {
//     Geolocation.getCurrentPosition(
//       position => {
//         const { latitude, longitude } = position.coords;
//         setRegion({
//           latitude,
//           longitude,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         });
//       },
//       error => console.log(error),
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         region={region}
//         showsUserLocation={true}
//         showsMyLocationButton={true}
//         zoomControlEnabled={true}
//         scrollEnabled={true}
//       >
//         <Marker
//           coordinate={{
//             latitude: region.latitude,
//             longitude: region.longitude
//           }}
//           title="Your Location"
//         />
//       </MapView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });

// export default MapScreen;