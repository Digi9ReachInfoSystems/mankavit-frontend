import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEntranceById } from "../../api/entranceApi";

import {
  EntranceMainContainer,
  EntranceTitle,
  EntranceLead,
  EntranceBanner,
//   MetaRow,
//   Chip,
//   PdfButton,
  Divider,
//   EntranceRich,
} from "./Entrances.style";

const Entrances = () => {
  const { id } = useParams();
  const [entrance, setEntrance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const data = await getEntranceById(id);
        setEntrance(data);
      } catch (e) {
        console.error(e);
        setErr("Failed to load entrance");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [id]);

  if (loading) return <EntranceMainContainer>Loading entrance details…</EntranceMainContainer>;
  if (err)
    return (
      <EntranceMainContainer style={{ color: "crimson" }}>
        {err}
      </EntranceMainContainer>
    );
  if (!entrance)
    return <EntranceMainContainer>Not found.</EntranceMainContainer>;

  return (
    <EntranceMainContainer>
      {entrance.banner && (
        <EntranceBanner src={entrance.banner} alt={entrance.title} />
      )}

      <EntranceTitle>{entrance.title}</EntranceTitle>

      <EntranceLead
        dangerouslySetInnerHTML={{ __html: entrance.description }}
      />

      <Divider />
    </EntranceMainContainer>
  );
};

export default Entrances;
