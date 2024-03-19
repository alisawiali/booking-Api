import { useEffect, useState } from "react";
import axios from "axios";

// Eine benutzerdefinierte Hook, die Daten von einer API abruft
const useFetch = (url) => {
  // Zustände für Daten, Ladezustand und Fehler
  const [data, setData] = useState([]); // Daten von der API
  const [loading, setLoading] = useState(false); // Ladezustand
  const [error, setError] = useState(false); // Fehler

  // useEffekt, der beim ersten Rendern und bei jeder Änderung der URL aufgerufen wird
  useEffect(() => {
    // Funktion zum Abrufen der Daten von der API
    const fetchData = async () => {
      setLoading(true); // Ladezustand auf true setzen
      try {
        const res = await axios.get(url); // Daten von der API abrufen
        setData(res.data); // Daten setzen
      } catch (error) {
        setError(error); // Fehler setzen, falls aufgetreten
      }
      setLoading(false); // Ladezustand auf false setzen, wenn der Abruf abgeschlossen ist
    };

    fetchData(); // fetchData aufrufen, um Daten beim ersten Rendern zu laden
  }, [url]); // Effekt wird erneut ausgeführt, wenn sich die URL ändert

  // Funktion zum erneuten Abrufen der Daten von der API
  const reFetch = async () => {
    setLoading(true); // Ladezustand auf true setzen
    try {
      const res = await axios.get(url); // Daten von der API erneut abrufen
      setData(res.data); // Daten setzen
    } catch (error) {
      setError(error); // Fehler setzen, falls aufgetreten
    }
    setLoading(false); // Ladezustand auf false setzen, wenn der erneute Abruf abgeschlossen ist
  };

  // Rückgabe der Daten, des Ladezustands, des Fehlers und der Funktion zum erneuten Abrufen der Daten
  return { data, loading, error, reFetch };
};

export default useFetch;
