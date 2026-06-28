package com.creaturelegends.game.battle

import com.creaturelegends.game.data.Creature
import com.creaturelegends.game.data.Move
import kotlin.random.Random

class BattleEngine(
    val playerCreature: Creature,
    val opponentCreature: Creature
) {
    private val log = mutableListOf<String>()
    var isPlayerTurn = playerCreature.speed >= opponentCreature.speed
    var isBattleOver = false
    var isPlayerWin = false

    fun playerAttack(move: Move): List<String> {
        log.clear()

        if (!move.isAvailable()) {
            log.add("${move.name} has no PP left!")
            return log
        }

        move.currentPp--
        val damage = calculateDamage(playerCreature, opponentCreature, move)

        if (Random.nextInt(100) < move.accuracy) {
            opponentCreature.hp = maxOf(0, opponentCreature.hp - damage)
            log.add("${playerCreature.name} used ${move.name}! Dealt $damage damage!")
        } else {
            log.add("${move.name} missed!")
        }

        if (opponentCreature.hp <= 0) {
            log.add("${opponentCreature.name} fainted! ${playerCreature.name} wins!")
            isBattleOver = true
            isPlayerWin = true
            return log
        }

        enemyTurn()
        return log
    }

    private fun enemyTurn() {
        val availableMoves = opponentCreature.moves.filter { it.isAvailable() }
        if (availableMoves.isEmpty()) {
            log.add("${opponentCreature.name} has no moves left!")
            isBattleOver = true
            isPlayerWin = true
            return
        }

        val move = availableMoves.random()
        move.currentPp--
        val damage = calculateDamage(opponentCreature, playerCreature, move)

        if (Random.nextInt(100) < move.accuracy) {
            playerCreature.hp = maxOf(0, playerCreature.hp - damage)
            log.add("${opponentCreature.name} used ${move.name}! Dealt $damage damage!")
        } else {
            log.add("${move.name} missed!")
        }

        if (playerCreature.hp <= 0) {
            log.add("${playerCreature.name} fainted! ${opponentCreature.name} wins!")
            isBattleOver = true
            isPlayerWin = false
        }
    }

    private fun calculateDamage(attacker: Creature, defender: Creature, move: Move): Int {
        val baseDamage = move.power * attacker.attack / (defender.defense + 1)
        val variance = Random.nextInt(85, 101) / 100.0
        return (baseDamage * variance).toInt().coerceAtLeast(1)
    }

    fun getLog(): List<String> = log
}
