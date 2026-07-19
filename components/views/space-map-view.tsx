"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LayoutGrid, List } from "lucide-react"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

interface Room {
  id: string
  number: string
  floor: number
  squareMeter: number
  status: "occupied" | "vacant" | "expiring-soon"
  tenant?: string
}

interface FloorMapViewProps {
  rooms?: Room[]
  onRoomClick?: (roomId: string) => void
}

// Mock data for rooms
const mockRooms: Room[] = [
  // Floor 2
  { id: "r201", number: "201", floor: 2, squareMeter: 45, status: "occupied", tenant: "Abebe" },
  { id: "r202", number: "202", floor: 2, squareMeter: 50, status: "vacant" },
  { id: "r203", number: "203", floor: 2, squareMeter: 45, status: "occupied", tenant: "Lemma" },
  { id: "r204", number: "204", floor: 2, squareMeter: 55, status: "expiring-soon", tenant: "Desta" },
  { id: "r205", number: "205", floor: 2, squareMeter: 48, status: "occupied", tenant: "Gete" },
  { id: "r206", number: "206", floor: 2, squareMeter: 52, status: "vacant" },

  // Floor 3
  { id: "r301", number: "301", floor: 3, squareMeter: 45, status: "occupied", tenant: "Getachew" },
  { id: "r302", number: "302", floor: 3, squareMeter: 50, status: "occupied", tenant: "Selam" },
  { id: "r303", number: "303", floor: 3, squareMeter: 45, status: "vacant" },
  { id: "r304", number: "304", floor: 3, squareMeter: 55, status: "occupied", tenant: "Yeshi" },
  { id: "r305", number: "305", floor: 3, squareMeter: 48, status: "expiring-soon", tenant: "Ahmed" },
  { id: "r306", number: "306", floor: 3, squareMeter: 52, status: "occupied", tenant: "Solomon" },

  // Floor 4
  { id: "r401", number: "401", floor: 4, squareMeter: 45, status: "occupied", tenant: "Tigist" },
  { id: "r402", number: "402", floor: 4, squareMeter: 50, status: "vacant" },
  { id: "r403", number: "403", floor: 4, squareMeter: 45, status: "occupied", tenant: "Kedir" },
  { id: "r404", number: "404", floor: 4, squareMeter: 55, status: "vacant" },
  { id: "r405", number: "405", floor: 4, squareMeter: 48, status: "occupied", tenant: "Fesseha" },
  { id: "r406", number: "406", floor: 4, squareMeter: 52, status: "expiring-soon", tenant: "Marta" },
]

export function SpaceMapView({ rooms = mockRooms, onRoomClick }: FloorMapViewProps) {
  const [viewMode, setViewMode] = useState<"map" | "list">("map")
  const [selectedFloor, setSelectedFloor] = useState(3)
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null)

  const floors = [...new Set(rooms.map((r) => r.floor))].sort()
  const currentFloorRooms = rooms.filter((r) => r.floor === selectedFloor)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "occupied":
        return "bg-emerald-500 hover:bg-emerald-600"
      case "vacant":
        return "bg-slate-400 hover:bg-slate-500"
      case "expiring-soon":
        return "bg-orange-500 hover:bg-orange-600"
      default:
        return "bg-slate-300"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "occupied":
        return "Occupied"
      case "vacant":
        return "Vacant"
      case "expiring-soon":
        return "Lease Expiring Soon"
      default:
        return status
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-900">Floor Plan & Space Map</h1>
          <p className="text-slate-600">
            Visual overview of property units and occupancy status
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "map" ? "default" : "outline"}
            onClick={() => setViewMode("map")}
            size="sm"
          >
            <LayoutGrid className="mr-2 h-4 w-4" />
            Map View
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            onClick={() => setViewMode("list")}
            size="sm"
          >
            <List className="mr-2 h-4 w-4" />
            List View
          </Button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 p-4 rounded-lg bg-slate-50 border border-slate-200">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-emerald-500" />
          <span className="text-sm font-medium text-slate-600">Occupied</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-slate-400" />
          <span className="text-sm font-medium text-slate-600">Vacant</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-orange-500" />
          <span className="text-sm font-medium text-slate-600">Lease Expiring Soon</span>
        </div>
      </div>

      {/* Floor Selector */}
      <div className="flex gap-2 flex-wrap">
        {floors.map((floor) => (
          <Button
            key={floor}
            variant={selectedFloor === floor ? "default" : "outline"}
            onClick={() => setSelectedFloor(floor)}
            className="min-w-24"
          >
            Floor {floor}
          </Button>
        ))}
      </div>

      {/* Map View */}
      {viewMode === "map" && (
        <div className="rounded-lg border border-slate-200 bg-white p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Floor {selectedFloor} Layout</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {currentFloorRooms.map((room) => (
              <HoverCard key={room.id}>
                <HoverCardTrigger asChild>
                  <button
                    onMouseEnter={() => setHoveredRoom(room.id)}
                    onMouseLeave={() => setHoveredRoom(null)}
                    onClick={() => onRoomClick?.(room.id)}
                    className={`relative p-4 rounded-lg text-white font-semibold transition-all transform hover:scale-105 cursor-pointer shadow-md ${getStatusColor(
                      room.status
                    )}`}
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold">{room.number}</div>
                      <div className="text-xs mt-1 opacity-90">{room.squareMeter} m²</div>
                    </div>
                  </button>
                </HoverCardTrigger>
                <HoverCardContent className="w-72">
                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-900">Room {room.number}</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-slate-600">Status</p>
                        <p className="font-semibold text-slate-900">
                          {getStatusText(room.status)}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-600">Size</p>
                        <p className="font-semibold text-slate-900">{room.squareMeter} m²</p>
                      </div>
                      {room.tenant && (
                        <div className="col-span-2">
                          <p className="text-slate-600">Tenant</p>
                          <p className="font-semibold text-slate-900">{room.tenant}</p>
                        </div>
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onRoomClick?.(room.id)}
                      className="w-full mt-2"
                    >
                      View Details
                    </Button>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                  Room
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                  Tenant
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-slate-700">
                  Size (m²)
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-slate-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentFloorRooms.map((room, idx) => (
                <tr
                  key={room.id}
                  className={`border-b border-slate-200 hover:bg-slate-50 ${
                    idx % 2 === 0 ? "bg-white" : "bg-slate-50"
                  }`}
                >
                  <td className="px-6 py-3 font-semibold text-slate-900">{room.number}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white ${
                        room.status === "occupied"
                          ? "bg-emerald-500"
                          : room.status === "vacant"
                            ? "bg-slate-400"
                            : "bg-orange-500"
                      }`}
                    >
                      {getStatusText(room.status)}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-slate-600">{room.tenant || "—"}</td>
                  <td className="px-6 py-3 text-right font-mono text-slate-600">
                    {room.squareMeter}
                  </td>
                  <td className="px-6 py-3 text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onRoomClick?.(room.id)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-600">Total Units (Floor {selectedFloor})</p>
          <p className="text-2xl font-bold text-slate-900 mt-2">{currentFloorRooms.length}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-600">Occupied</p>
          <p className="text-2xl font-bold text-emerald-600 mt-2">
            {currentFloorRooms.filter((r) => r.status === "occupied").length}
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-600">Vacant</p>
          <p className="text-2xl font-bold text-slate-600 mt-2">
            {currentFloorRooms.filter((r) => r.status === "vacant").length}
          </p>
        </div>
      </div>
    </div>
  )
}
