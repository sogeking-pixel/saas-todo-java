import { useState, useCallback, useEffect } from "react";
import * as taskService from "../api/apiTask";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, loading, error, refresh: fetchTasks };
}

export function useTask(taskId) {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!taskId) return;
    let cancelled = false;

    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await taskService.getTaskById(taskId);
        if (!cancelled) setTask(data);
      } catch (err) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetch();

    return () => {
      cancelled = true;
    };
  }, [taskId]);

  return { task, loading, error };
}

export function useCreateTask() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = async (taskData) => {
    setLoading(true);
    setError(null);
    try {
      const created = await taskService.createTask(taskData);
      return created;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { create, loading, error };
}


export function useUpdateTask() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const update = async (taskId, taskData) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await taskService.updateTask(taskId, taskData);
      return updated;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error };
}

export function useDeleteTask() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const remove = async (taskId) => {
    setLoading(true);
    setError(null);
    try {
      const res = await taskService.deleteTask(taskId);
      return res;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { remove, loading, error };
}
