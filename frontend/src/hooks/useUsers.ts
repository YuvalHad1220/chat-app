import { useEffect, useMemo, useState } from "react";
import { useSocketContext } from "../contexts/useSocketContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchUsers, postUser } from "../api/users";

type useSidebarUsersProps = {
  closeChatModal?: () => void;
};

const useUsers = ({ closeChatModal }: useSidebarUsersProps) => {
  const { socketData } = useSocketContext();
  const [users, setUsers] = useState<User[]>([])
  const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    initialData: [],
  });

  const postChat = useMutation({
    mutationFn: postUser,
    onSuccess: (data) => {
      if (closeChatModal)
        closeChatModal();
      console.log(data);
    },
    onError: (error) => {console.log(error)},
  });

  useEffect(() => {
    setUsers(prev => [...prev, ...data])
  }, [data])

  useEffect(() => {
    if (!socketData) return;

    const asPayload = JSON.parse(socketData) as Payload;
    if (asPayload.payloadType === "USER")
        setUsers(prev => [...prev, asPayload.payloadContent])
  }, [socketData]);


  return {data, isLoading, postChat, users}
};

export default useUsers;
