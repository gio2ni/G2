package com.creaturelegends.game.battle

import com.creaturelegends.game.data.CreatureFactory
import org.junit.Test
import org.junit.Assert.*

class BattleEngineTest {

    @Test
    fun testBattleInitialization() {
        val player = CreatureFactory.createBlazeFox()
        val opponent = CreatureFactory.createAquaShell()
        val battle = BattleEngine(player, opponent)

        assertFalse(battle.isBattleOver)
        assertFalse(battle.isPlayerWin)
    }

    @Test
    fun testPlayerAttackReducesOpponentHp() {
        val player = CreatureFactory.createBlazeFox()
        val opponent = CreatureFactory.createAquaShell()
        val battle = BattleEngine(player, opponent)

        val initialHp = opponent.hp
        val move = player.moves.first()
        battle.playerAttack(move)

        assertTrue(opponent.hp <= initialHp)
    }

    @Test
    fun testMoveWithNoPpIsNotAvailable() {
        val player = CreatureFactory.createBlazeFox()
        val move = player.moves.first()

        repeat(move.maxPp) {
            move.currentPp--
        }

        assertFalse(move.isAvailable())
    }

    @Test
    fun testBattleEndsWhenCreatureFaints() {
        val player = CreatureFactory.createBlazeFox()
        val opponent = CreatureFactory.createAquaShell()
        val battle = BattleEngine(player, opponent)

        opponent.hp = 0

        assertTrue(opponent.hp <= 0)
    }
}
