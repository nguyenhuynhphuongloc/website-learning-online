import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from "@nextui-org/react";

export const columns = [
    { name: "#", uid: "rank" },
    { name: "NAME", uid: "name" },
    { name: "SCORE", uid: "score" },
    { name: "TIME", uid: "time" },
];

export const users = [
    { id: 1, name: "Tony Reichert", score: 95, time: "10:25 AM" },
    { id: 2, name: "Zoey Lang", score: 87, time: "11:00 AM" },
    { id: 3, name: "Jane Fisher", score: 92, time: "09:45 AM" },
    { id: 4, name: "William Howard", score: 88, time: "01:15 PM" },
    { id: 5, name: "Kristen Copper", score: 99, time: "02:30 PM" },
];

export default function TableRank() {
    const renderCell = React.useCallback((user: { [x: string]: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }, columnKey: string | number, rank: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined) => {
        switch (columnKey) {
            case "rank":
                return <p className="text-sm font-semibold">{rank}</p>;
            case "name":
                return <p className="text-sm capitalize font-semibold">{user[columnKey]}</p>;
            case "score":
            case "time":
                return <p className="text-sm">{user[columnKey]}</p>;
            default:
                return null;
        }
    }, []);

    return (
        <div className="overflow-x-auto">
            <h1 className="text-customBlue text-4xl">Leaderboard</h1>
            <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-customBlue">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.uid}
                                className="p-4 text-left text-white font-bold"
                            >
                                {column.name}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, rowIndex) => (
                        <tr
                            key={user.id}
                            className={`${rowIndex % 2 === 0 ? "bg-gray-200" : "bg-brown-100"
                                }`}
                        >
                            {columns.map((column, colIndex) => (
                                <td
                                    key={column.uid}
                                    className="p-4 border-t border-gray-300"
                                >
                                    {renderCell(user, column.uid, rowIndex + 1)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
