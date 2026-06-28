# Proguard rules for Creature Legends

# Keep all classes in the game package
-keep class com.creaturelegends.game.** { *; }

# Kotlin
-keepclassmembers class kotlin.Metadata {
    *** NAME;
    *** KIND;
    *** COMPILER_VERSION;
    *** SOURCE_FILE_NAME;
    *** getters;
    *** setters;
}

# Compose
-keep class androidx.compose.** { *; }
-dontwarn androidx.compose.**
