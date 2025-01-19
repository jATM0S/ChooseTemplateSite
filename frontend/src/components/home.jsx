import { useEffect, useState } from "react";
import axios from "axios";
import Site1 from "./site1.jsx";
import Site2 from "./site2.jsx";

export default function Home() {
  const [choosenTemplate, setChoosenTemplate] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getChoosen");
        setChoosenTemplate(response.data.choosenTemplate); // Set the initial form data from JSON file
      } catch (error) {
        console.error("Error loading JSON data:", error);
      }
      console.log(choosenTemplate);
    };

    loadData();
  }, []);
  return (<>{choosenTemplate == 1 ? <Site1 /> : <Site2 />}</>);
}
