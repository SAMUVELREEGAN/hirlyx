import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Keyboard } from "react-native";
import { api } from "../api";
import { getToken } from "../auth";
import TodoItem from "../components/TodoItem";

export default function DashboardScreen() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  const loadTodos = async () => {
    const token = await getToken();
    const res = await api.get("/todos/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!task.trim()) return;
    const token = await getToken();
    await api.post(
      "/todos/",
      { title: task.trim() },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTask("");
    Keyboard.dismiss();
    loadTodos();
  };

  const completeTodo = async (id) => {
    const token = await getToken();
    await api.patch(
      `/todos/${id}/`,
      { completed: true },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    loadTodos();
  };

  const deleteTodo = async (id) => {
    const token = await getToken();
    await api.delete(`/todos/${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    loadTodos();
  };

  const editTodo = async (id, title) => {
    const token = await getToken();
    await api.patch(
      `/todos/${id}/`,
      { title },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    loadTodos();
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Tasks</Text>

      <View style={styles.row}>
        <TextInput
          value={task}
          onChangeText={setTask}
          placeholder="New task..."
          style={styles.input}
        />
        <TouchableOpacity style={styles.addBtn} onPress={addTodo}>
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            onComplete={completeTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  row: { flexDirection: "row", marginBottom: 15 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  addBtn: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginLeft: 10,
    borderRadius: 10,
  },
  addText: { color: "#fff", fontWeight: "bold" },
});
