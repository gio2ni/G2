package com.creaturelegends.game.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val DarkColorScheme = darkColorScheme(
    primary = Color(0xFF00d4ff),
    secondary = Color(0xFFff006e),
    tertiary = Color(0xFF00ff88),
    background = Color(0xFF1a1a2e),
    surface = Color(0xFF16213e),
    onBackground = Color.White,
    onSurface = Color.White
)

@Composable
fun CreatureLegendTheme(
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = DarkColorScheme,
        typography = Typography,
        content = content
    )
}
