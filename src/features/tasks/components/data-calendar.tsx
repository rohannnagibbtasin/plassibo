import { Task, TaskStatus } from "../types";
import { Calendar as CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { format, parse, startOfWeek, addMonths, subMonths, getDay } from 'date-fns'
import { enUS } from 'date-fns/locale';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import { useState } from "react";
import { EventCard } from "./event-card";
import { Button } from "@/components/ui/button";
import { Project } from "@/features/projects/types";
import { Member } from "@/features/members/types";

const DnDCalendar = withDragAndDrop<CalendarEvent>(Calendar)

const locales = {
    "en-US": enUS
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})

interface CalendarEvent {
  start: Date;
  end: Date;
  title: string;
  id: string;
  status: TaskStatus;
  assignee: Member;
  project: Project;
}

interface CustomToolbarProps{
    date: Date;
    onNavigate: (action: "PREV" | "NEXT" | "TODAY") => void;
}
const CustomToolbar = ({date, onNavigate}: CustomToolbarProps)=>{
    return (
        <div className="flex mb-4 gap-x-2 items-center w-full lg:w-auto justify-center lg:justify-start">
            <Button
                onClick={()=> onNavigate("PREV")}
                variant="secondary"
                size="icon"
            >
                <ChevronLeftIcon className="size-4" />
            </Button>
            <div className="flex items-center border border-input rounded-md px-3 py-2 h-8 justify-center w-full lg:w-auto">
                <CalendarIcon className="size-4 mr-2" />
                <p>{format(date, "MMMM yyyy")}</p>
            </div>
            <Button
                onClick={()=> onNavigate("NEXT")}
                variant="secondary"
                size="icon"
            >
                <ChevronRightIcon className="size-4" />
            </Button>
        </div>
    )
}

interface DataCalenderProps {
    data: Task[]
}

export const DataCalender = ({ data }: DataCalenderProps) => {
    const [value, setvalue] = useState(
        data.length > 0 ? new Date(data[0].dueDate) : new Date()
    )

    const events: CalendarEvent[] = data.map((task) => ({
        start: new Date(task.dueDate),
        end: new Date(task.dueDate),
        title: task.name,
        project: task.project,
        assignee: task.assignee,
        status: task.status,
        id: task.$id
    }))

    const handleNavigate = (action: "PREV" | "NEXT" | "TODAY") => {
        if (action === "PREV") {
            setvalue(subMonths(value, 1))
        } else if (action === "NEXT") {
            setvalue(addMonths(value, 1))
        } else if (action === "TODAY") {
            setvalue(new Date())
        }
    }

    return (
        <DnDCalendar
            localizer={localizer}
            date={value}
            events={events}
            views={["month"]}
            defaultView="month"
            showAllEvents
            className="h-full"
            max={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
            formats={{
                weekdayFormat: (date, culture, localizer) => localizer?.format(date, "EEE", culture) ?? ""
            }}
            components={{
                eventWrapper: ({ event }: { event: CalendarEvent }) => (
                    <EventCard
                        id={event.id}
                        title={event.title}
                        assignee={event.assignee}
                        status={event.status}
                        project={event.project}                        
                    />
                ),
                toolbar: ()=>(
                    <CustomToolbar date={value} onNavigate={handleNavigate} />
                )
            }}
        />
    )
}