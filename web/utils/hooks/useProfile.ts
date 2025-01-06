import { useState, useEffect, useMemo } from "react";
import useSupabase from "@/utils/hooks/useSupabase";

const useProfiles = (ids: any[]) => {
  const supabase = useSupabase();
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Memoize the `ids` array to ensure stability as a dependency
  const stableIds = useMemo(() => ids?.sort()?.join(","), [ids]);

  useEffect(() => {
    const fetchProfiles = async () => {
      if (!stableIds) return; // Prevent unnecessary fetches
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .in("id", ids);

      if (error) {
        setError("Error fetching profiles");
        console.error("Error fetching profiles:", error);
      } else {
        setProfiles(data || []);
      }
      setLoading(false);
    };

    fetchProfiles();
  }, [stableIds, supabase]); // Use `stableIds` as a dependency

  return { profiles, loading, error };
};

export default useProfiles;
