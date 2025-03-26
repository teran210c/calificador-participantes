"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"

const AddConcursanteButton = ({ onAddConcursante, concursoId }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [nombre, setNombre] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [mounted, setMounted] = useState(false)

  // Handle client-side portal mounting
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // Close modal with ESC key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      window.addEventListener("keydown", handleEsc)
    }

    return () => window.removeEventListener("keydown", handleEsc)
  }, [isOpen])

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const handleSubmit = async () => {
    if (!nombre.trim()) {
      setError("Por favor ingrese un nombre")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("http://localhost:3010/api/concursantes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, concurso_id: concursoId }),
      })

      if (!response.ok) {
        throw new Error("No se pudo agregar el concursante")
      }

      const newConcursante = await response.json()
      onAddConcursante(newConcursante)
      setIsOpen(false)
      setNombre("")
    } catch (error) {
      console.error("Error al agregar concursante:", error)
      setError(error instanceof Error ? error.message : "Error al agregar concursante")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Stop event propagation to prevent carousel navigation
  const handleButtonClick = (e) => {
    e.stopPropagation()
    setIsOpen(true)
  }

  return (
    <>
      {/* Add Button */}
      <button
        type="button"
        onClick={handleButtonClick}
        className="bg-white text-green-500 rounded-full p-6 text-4xl shadow-lg transition-transform transform hover:scale-110 hover:bg-green-600 hover:text-white hover:cursor-pointer"
        aria-label="Agregar concursante"
      >
        +
      </button>

      {/* Modal - Using portal to render outside the carousel */}
      {mounted &&
        isOpen &&
        createPortal(
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]"
            onClick={(e) => {
              e.stopPropagation()
              // Close when clicking outside the modal
              if (e.target === e.currentTarget) {
                setIsOpen(false)
              }
            }}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg w-96 text-center animate-in fade-in zoom-in duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg font-bold mb-4">Agregar Concursante</h2>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ingrese el nombre"
                className="w-full border border-gray-300 p-2 rounded-md"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit()
                  }
                }}
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <div className="mt-4 flex justify-around">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleSubmit()
                  }}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                  disabled={isSubmitting || !nombre.trim()}
                >
                  {isSubmitting ? "Agregando..." : "Agregar"}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsOpen(false)
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  type="button"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}

export default AddConcursanteButton

