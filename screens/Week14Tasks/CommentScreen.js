import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
} from "react-native";

export default function CommentScreen() {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const fetchComments = () => {
    fetch("https://reimagined-orbit-4jg9rq6vj49wcw96-4000.app.github.dev/comments/get-comments", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.error(err));
  };

  const postComment = () => {
    fetch("https://reimagined-orbit-4jg9rq6vj49wcw96-4000.app.github.dev/comments/add-comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, text }),
    })
      .then((res) => res.json())
      .then((data) => {
        setText("");
        fetchComments();
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Comments</Text>

      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Your Comment"
        value={text}
        onChangeText={setText}
      />
      <Button title="Add Comment" onPress={postComment} />

      <FlatList
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        renderItem={({ item }) => (
          <View style={styles.commentBox}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.text}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 30, flex: 1, backgroundColor: "#f9f9f9" },
  heading: { fontSize: 34, marginBottom: 10, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    fontSize: 18
  },
  list: { marginTop: 20,  },
  commentBox: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    fontSize: 18,
  },
  name: { fontWeight: "bold" },
});
