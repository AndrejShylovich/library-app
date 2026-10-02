import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { setDisplayLoan } from "@/shared/store/slices/ModalSlice";

import { useCheckinBook } from "@/entities/book/model/hooks/useCheckinBook";
import { useMe } from "@/entities/user/model/hooks/useMe";

import type { DomainBook } from "@/entities/book/model/domain/Book";

export const useBookCheckin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useMe();

  const [checkinBookMutation] = useCheckinBook();

  const handleCheckin = useCallback(
    async (book: DomainBook) => {
      if (!user) {
        toast.error("No user");
        return;
      }

      try {
        await checkinBookMutation({
          book,
          employee: user,
        });

        dispatch(setDisplayLoan(false));

        navigate("/");

        toast.success(`Returned "${book.title}"`);
      } catch (e) {
        console.error("Checkin failed", e);
        toast.error("Checkin failed");
      }
    },
    [user, checkinBookMutation, dispatch, navigate],
  );

  return {
    user,
    handleCheckin,
  };
};
