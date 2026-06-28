package com.creaturelegends.game.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.creaturelegends.game.battle.BattleEngine
import com.creaturelegends.game.data.CreatureFactory
import com.creaturelegends.game.data.Move

@Composable
fun GameScreen() {
    val battleState = remember { mutableStateOf<BattleState>(BattleState.Menu) }
    val battleEngine = remember {
        val player = CreatureFactory.createBlazeFox()
        val opponent = CreatureFactory.createRandomCreature()
        BattleEngine(player, opponent)
    }

    when (battleState.value) {
        BattleState.Menu -> MenuScreen {
            battleState.value = BattleState.Battle
        }
        BattleState.Battle -> BattleScreen(battleEngine) { result ->
            battleState.value = BattleState.Result(result)
        }
        is BattleState.Result -> ResultScreen((battleState.value as BattleState.Result).isWin) {
            battleState.value = BattleState.Menu
        }
    }
}

@Composable
fun MenuScreen(onStartBattle: () -> Unit) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF1a1a2e))
            .padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            "Creature Legends",
            fontSize = 40.sp,
            fontWeight = FontWeight.Bold,
            color = Color(0xFF00d4ff),
            modifier = Modifier.padding(bottom = 32.dp)
        )

        Text(
            "Battle creatures and become a master!",
            fontSize = 16.sp,
            color = Color.White,
            modifier = Modifier.padding(bottom = 48.dp)
        )

        Button(
            onClick = onStartBattle,
            modifier = Modifier
                .fillMaxWidth(0.7f)
                .height(60.dp)
        ) {
            Text("Start Battle", fontSize = 18.sp)
        }
    }
}

@Composable
fun BattleScreen(battleEngine: BattleEngine, onBattleEnd: (Boolean) -> Unit) {
    val battleLog = remember { mutableStateOf(listOf<String>()) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF1a1a2e))
            .padding(16.dp),
        verticalArrangement = Arrangement.SpaceBetween
    ) {
        BattleHeader(battleEngine)

        BattleLog(battleLog.value)

        if (!battleEngine.isBattleOver) {
            MoveButtons(battleEngine.playerCreature.moves) { move ->
                val log = battleEngine.playerAttack(move)
                battleLog.value = log
                if (battleEngine.isBattleOver) {
                    onBattleEnd(battleEngine.isPlayerWin)
                }
            }
        } else {
            Button(
                onClick = { onBattleEnd(battleEngine.isPlayerWin) },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(50.dp)
            ) {
                Text("Continue", fontSize = 16.sp)
            }
        }
    }
}

@Composable
fun BattleHeader(battleEngine: BattleEngine) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .background(Color(0xFF16213e))
            .padding(16.dp),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Column {
            Text(
                battleEngine.playerCreature.name,
                color = Color(0xFF00d4ff),
                fontWeight = FontWeight.Bold,
                fontSize = 18.sp
            )
            Text(
                "HP: ${battleEngine.playerCreature.hp}/${battleEngine.playerCreature.maxHp}",
                color = Color.White,
                fontSize = 14.sp
            )
        }

        Column(horizontalAlignment = Alignment.End) {
            Text(
                battleEngine.opponentCreature.name,
                color = Color(0xFFff006e),
                fontWeight = FontWeight.Bold,
                fontSize = 18.sp
            )
            Text(
                "HP: ${battleEngine.opponentCreature.hp}/${battleEngine.opponentCreature.maxHp}",
                color = Color.White,
                fontSize = 14.sp
            )
        }
    }
}

@Composable
fun BattleLog(log: List<String>) {
    LazyColumn(
        modifier = Modifier
            .fillMaxWidth()
            .height(200.dp)
            .background(Color(0xFF0f3460))
            .padding(12.dp)
    ) {
        items(log) { message ->
            Text(
                message,
                color = Color.White,
                fontSize = 14.sp,
                modifier = Modifier.padding(vertical = 4.dp)
            )
        }
    }
}

@Composable
fun MoveButtons(moves: List<Move>, onMoveSelected: (Move) -> Unit) {
    Column(modifier = Modifier.fillMaxWidth()) {
        moves.forEach { move ->
            Button(
                onClick = { onMoveSelected(move) },
                enabled = move.isAvailable(),
                modifier = Modifier
                    .fillMaxWidth()
                    .height(45.dp)
                    .padding(vertical = 4.dp)
            ) {
                Text("${move.name} (PP: ${move.currentPp}/${move.maxPp})")
            }
        }
    }
}

@Composable
fun ResultScreen(isWin: Boolean, onReturn: () -> Unit) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF1a1a2e))
            .padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            if (isWin) "Victory!" else "Defeat!",
            fontSize = 40.sp,
            fontWeight = FontWeight.Bold,
            color = if (isWin) Color(0xFF00d4ff) else Color(0xFFff006e),
            modifier = Modifier.padding(bottom = 32.dp)
        )

        Button(
            onClick = onReturn,
            modifier = Modifier
                .fillMaxWidth(0.7f)
                .height(60.dp)
        ) {
            Text("Return to Menu", fontSize = 18.sp)
        }
    }
}

sealed class BattleState {
    object Menu : BattleState()
    object Battle : BattleState()
    data class Result(val isWin: Boolean) : BattleState()
}
