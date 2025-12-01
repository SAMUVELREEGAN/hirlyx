import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TodoItem({ item, onComplete, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(item.title);

  const handleSave = () => {
    if (!editedTitle.trim()) {
      Alert.alert("Error", "Task cannot be empty");
      return;
    }

    if (editedTitle !== item.title) {
      onEdit(item.id, editedTitle.trim());
    }

    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(item.title);
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      {/* Complete Button */}
      <TouchableOpacity onPress={() => onComplete(item.id)}>
        <Ionicons
          name={item.completed ? "checkmark-circle" : "ellipse-outline"}
          size={28}
          color={item.completed ? "green" : "gray"}
        />
      </TouchableOpacity>

      {/* Text or Edit Input */}
      <View style={styles.textContainer}>
        {isEditing ? (
          <TextInput
            value={editedTitle}
            onChangeText={setEditedTitle}
            style={styles.editInput}
            autoFocus
          />
        ) : (
          <Text
            style={[
              styles.text,
              item.completed && {
                textDecorationLine: "line-through",
                color: "gray",
                opacity: 0.7,
              },
            ]}
          >
            {item.title}
          </Text>
        )}
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        {!item.completed && (
          <TouchableOpacity
            onPress={() => (isEditing ? handleSave() : setIsEditing(true))}
            style={styles.actionButton}
          >
            <Ionicons
              name={isEditing ? "checkmark" : "pencil"}
              size={22}
              color={isEditing ? "green" : "#007bff"}
            />
          </TouchableOpacity>
        )}

        {isEditing ? (
          <TouchableOpacity onPress={handleCancel} style={styles.actionButton}>
            <Ionicons name="close" size={22} color="red" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => onDelete(item.id)}
            style={styles.actionButton}
          >
            <Ionicons name="trash-outline" size={22} color="red" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    marginVertical: 6,
    backgroundColor: "#fff",
    elevation: 2,
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  editInput: {
    fontSize: 16,
    fontWeight: "500",
    borderBottomWidth: 1,
    borderBottomColor: "#007bff",
    paddingVertical: 4,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  actionButton: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: "#f8f9fa",
  },
});
