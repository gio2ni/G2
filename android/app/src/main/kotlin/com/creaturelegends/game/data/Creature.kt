package com.creaturelegends.game.data

data class Creature(
    val id: Int,
    val name: String,
    val type: CreatureType,
    val level: Int = 1,
    val maxHp: Int,
    var hp: Int = maxHp,
    val attack: Int,
    val defense: Int,
    val speed: Int,
    val experience: Int = 0,
    val moves: List<Move> = emptyList()
)

enum class CreatureType {
    FIRE, WATER, GRASS, ELECTRIC, ROCK, GROUND, FLYING, PSYCHIC, BUG, NORMAL
}

data class Move(
    val id: Int,
    val name: String,
    val type: CreatureType,
    val power: Int,
    val accuracy: Int = 100,
    val maxPp: Int = 15,
    var currentPp: Int = maxPp
) {
    fun isAvailable(): Boolean = currentPp > 0
}
