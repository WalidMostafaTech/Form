import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { openModal } from "@/store/modals/modalsSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const EventOrderCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <div className="p-3 border rounded-lg items-start flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2 w-full">
        <h3 className="text-lg line-clamp-2">{item.event_type}</h3>

        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              dispatch(
                openModal({
                  modalName: "UpdateEventModal",
                  modalData: { ...item },
                }),
              )
            }
            className="w-7 h-7 flex items-center justify-center 
                  bg-primary-foreground text-primary rounded-full hover:brightness-95 transition"
          >
            <RiEdit2Line />
          </button>

          <button
            onClick={() =>
              dispatch(
                openModal({
                  modalName: "DeleteEventOrderModal",
                  modalData: { item_id: item.id },
                }),
              )
            }
            className="w-7 h-7 flex items-center justify-center 
                  bg-destructive-foreground text-destructive rounded-full hover:brightness-95 transition"
          >
            <RiDeleteBinLine />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-primary bg-primary-foreground py-1 px-2 rounded">
          {item.date}
        </span>
        <span className="text-xs font-semibold text-primary bg-primary-foreground py-1 px-2 rounded">
          {t("EventOrderCard.start")}: {item.start_time}
        </span>
        <span className="text-xs font-semibold text-primary bg-primary-foreground py-1 px-2 rounded">
          {t("EventOrderCard.end")}: {item.end_time}
        </span>
      </div>

      <p className="text-sm text-muted-foreground">
        {item.people_number} {t("EventOrderCard.guests")}
      </p>
      <p className="text-sm text-muted-foreground">{item.attendees_gender}</p>
      <p className="text-sm text-muted-foreground">{item.location}</p>

      <Button
        size="xs"
        variant={"outline"}
        onClick={() => navigate(`/profile/event-orders/${item.id}`)}
      >
        {t("EventOrderCard.viewDetails")}
      </Button>
    </div>
  );
};

export default EventOrderCard;
