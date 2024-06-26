import { useNavigate, useParams } from "react-router-dom";
import DataContext from "./DataContext";
import { useContext, useEffect } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import Assignment from "./components/Assignment";
import { Button } from "./components/ui/button";
import { NavBar } from "./components/NavBar";
import { CardWrapper } from "./components/CardWrapper";
import { colorGrade, letterGrade } from "./lib/utils";

export const Class = () => {
  const { index } = useParams();
  const {
    totalGrades,
    loggedIn,
    addAssignment,
    editAssignment,
    deleteAssignment,
    counter,
    setCounter,
    curClassData,
    resetAssignments,
  } = useContext(DataContext);

  const navigate = useNavigate();

  const curClassGrades =
    index !== undefined ? totalGrades[parseInt(index)] : undefined;

  const curClass =
    index !== undefined ? curClassData[parseInt(index)] : undefined;

  useEffect(() => {
    if (!index) navigate("/");
    if (!loggedIn) navigate("/");
  }, []);

  return (
    <div className="p-2 md:p-4 no-scrollbar">
      <NavBar link={true} />
      {curClassGrades && (
        <div className="flex flex-col items-start md:items-center gap-4">
          <CardWrapper>
            <h1 className="text-2xl font-semibold text-center">{curClassGrades.name}</h1>
            <h1 className="text-xl text-sm text-muted-foreground text-center">{curClassGrades.teacher}</h1>
            <div className="flex justify-center w-full gap-12 items-center px-6 md:px-12 mt-4">
              <div
                className={
                  "flex flex-col items-center " +
                  colorGrade(curClassGrades.ATGrade)
                }
              >
                <p className="text-gray-400">AT</p>
                <h1 className="font-bold text-4xl">
                  {letterGrade(curClassGrades.ATGrade)}
                </h1>
                <h2 className="text-sm font-semibold">
                  {curClassGrades.ATGrade}
                </h2>
                <h2 className="text-sm">
                  {curClassGrades.ATEarned}/{curClassGrades.ATTotal}
                </h2>
              </div>
              <div
                className={
                  "flex flex-col items-center " +
                  colorGrade(curClassGrades.grade)
                }
              >
                <p className="text-gray-400">Total</p>
                <h1 className="font-bold text-7xl">
                  {letterGrade(curClassGrades.grade)}
                </h1>
                <h2 className="text-xl font-semibold">
                  {curClassGrades.grade}
                </h2>
              </div>
              <div
                className={
                  "flex flex-col items-center " +
                  colorGrade(curClassGrades.PPGrade)
                }
              >
                <p className="text-gray-400">PP</p>
                <h1 className="font-bold text-4xl">
                  {letterGrade(curClassGrades.PPGrade)}
                </h1>
                <h2 className="text-sm font-semibold">
                  {curClassGrades.PPGrade}
                </h2>
                <h2 className="text-sm">
                  {curClassGrades.PPEarned}/{curClassGrades.PPTotal}
                </h2>
              </div>
            </div>
          </CardWrapper>
          <CardWrapper
            className="w-full overflow-scroll"
            cardClassName="overflow-scroll w-full md:w-auto"
          >
            <div className="flex justify-between w-full md:w-auto">
              <Button onClick={() => resetAssignments()}>Reset</Button>
              <Button
                onClick={() => {
                  addAssignment(parseInt(index ? index : "0"), {
                    title: `New Assignment ${counter}`,
                    date: "N/A -",
                    assignmentType: "All Tasks / Assessments",
                    points: 0,
                    pointsPossible: 0,
                  });
                  setCounter((counter: number) => counter + 1);
                }}
              >
                +
              </Button>
            </div>
            <Table className="overflow-auto no-scrollbar"> {/* used to be overflow-scroll */}

              <TableHeader>
                <TableRow>
                  <TableHead className="mx-0 hidden md:table-cell"></TableHead>
                  <TableHead className="w-32 hidden md:table-cell">
                    Date
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {curClass?.assignments.map((assignment: any, i: number) => (
                  <Assignment
                    key={
                      assignment.title + assignment.date + curClassGrades?.name
                    }
                    assignmentIndex={i}
                    classIndex={parseInt(index ? index : "0")}
                    assignment={assignment}
                    editAssignment={editAssignment}
                    deleteAssignment={deleteAssignment}
                  />
                ))}
              </TableBody>
            </Table>
          </CardWrapper>
        </div>
      )}
    </div>
  );
};

export default Class;
