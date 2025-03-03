// Company.js
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from "react-native";

const Company = ({ route, navigation }) => {
  const data = route.params?.data;
  const [orientation, setOrientation] = React.useState(
    Dimensions.get("window").width > Dimensions.get("window").height ? "LANDSCAPE" : "PORTRAIT"
  );

  React.useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get("window");
      setOrientation(width > height ? "LANDSCAPE" : "PORTRAIT");
    };

    const dimensionsListener = Dimensions.addEventListener("change", updateOrientation);
    return () => dimensionsListener.remove();
  }, []);

  const dynamicStyles = {
    imageHeight: orientation === "PORTRAIT" ? 200 : 150,
    titleSize: orientation === "PORTRAIT" ? 24 : 20,
    contentPadding: orientation === "PORTRAIT" ? 20 : 15,
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("./../assets/download.jpeg")}
        style={[styles.image, { height: dynamicStyles.imageHeight }]}
      />
      <View style={[styles.contentContainer, { padding: dynamicStyles.contentPadding }]}>
        <Text style={[styles.title, { fontSize: dynamicStyles.titleSize }]}>{data.name}</Text>
        <Text style={styles.description}>{data.description}</Text>

        <View style={styles.ratingContainer}>
          <Text style={styles.star}>⭐</Text>
          <Text style={styles.rating}>4.95</Text>
          <Text style={styles.reviews}> 22 reviews - Write a review</Text>
        </View>

        <TouchableOpacity style={styles.buttonSecondary}>
          <Text style={styles.buttonText}>Invest</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonSecondary}>
          <Text style={styles.buttonText}>Follow</Text>
        </TouchableOpacity>

        <Text style={styles.reviewsTitle}>Purpose: </Text>
        <Text style={styles.reviewText}>{data.purpose}</Text>
        <Text style={styles.reviewsTitle}>Service/Product: </Text>
        <Text style={styles.reviewText}>{data.services}</Text>
        <Text style={styles.reviewsTitle}>Link to Website: </Text>
        <Text style={styles.reviewText}>{data.website}</Text>

        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => {
            navigation.navigate("createCompany");
          }}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    resizeMode: "cover",
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    color: "#ff6b6b",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#aaa",
    marginBottom: 15,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  star: {
    fontSize: 16,
    color: "#ff6b6b",
  },
  rating: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff6b6b",
    marginLeft: 5,
  },
  reviews: {
    fontSize: 14,
    color: "#aaa",
  },
  buttonSecondary: {
    backgroundColor: "#ffe6e6",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff6b6b",
  },
  reviewsTitle: {
    fontWeight: "bold",
    color: "#ff6b6b",
    marginTop: 20,
  },
  reviewText: {
    fontSize: 14,
    color: "#000",
  },
});

export default Company;