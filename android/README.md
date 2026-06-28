# 🎮 Creature Legends - Android RPG Game

Un jeu RPG inspiré par les jeux de créatures célèbres, développé en **Kotlin** pour **Android** avec **Jetpack Compose**.

## 📋 Fonctionnalités Actuelles

- ✅ Système de créatures (Blaze Fox, Aqua Shell, Leaf Sprout, Thunder Bird)
- ✅ Système de combat au tour par tour
- ✅ Calcul de dégâts réaliste avec variance
- ✅ Système de mouvements/attaques avec PP
- ✅ Interface utilisateur avec Jetpack Compose
- ✅ Menu principal et écran de résultats

## 🏗️ Structure du Projet

```
android/
├── app/
│   ├── src/
│   │   ├── main/
│   │   │   ├── kotlin/
│   │   │   │   └── com/creaturelegends/game/
│   │   │   │       ├── MainActivity.kt
│   │   │   │       ├── data/
│   │   │   │       │   ├── Creature.kt
│   │   │   │       │   └── CreatureFactory.kt
│   │   │   │       ├── battle/
│   │   │   │       │   └── BattleEngine.kt
│   │   │   │       └── ui/
│   │   │   │           ├── GameScreen.kt
│   │   │   │           └── theme/
│   │   │   │               ├── Theme.kt
│   │   │   │               └── Type.kt
│   │   │   ├── AndroidManifest.xml
│   │   │   └── res/
│   │   │       └── values/
│   │   │           ├── strings.xml
│   │   │           └── styles.xml
│   └── build.gradle
├── settings.gradle
└── build.gradle

```

## 🚀 Pour Commencer

### Prérequis
- Android Studio Arctic Fox ou plus récent
- SDK Android 21+
- Kotlin 1.8.0+

### Installation

1. Ouvrez le dossier `android/` dans Android Studio
2. Laissez Gradle synchroniser les dépendances
3. Branchez un appareil Android ou lancez l'émulateur
4. Appuyez sur "Run" (ou Ctrl+R)

## 🎯 Évolutions Futures

- [ ] Système d'exploration du monde
- [ ] Capture de créatures sauvages
- [ ] Système de progressions et d'évolutions
- [ ] Inventaire et objets
- [ ] Sauvegarde de la progression
- [ ] Musique et effets sonores
- [ ] Multiplayer et commerce
- [ ] Plus de créatures (50+)
- [ ] Mouvements spéciaux avec animations
- [ ] Pokédex

## 📱 Créatures Disponibles

1. **Blaze Fox** (Feu)
   - Type: Feu
   - Mouvements: Ember, Tackle, Growl
   
2. **Aqua Shell** (Eau)
   - Type: Eau
   - Mouvements: Water Gun, Bubble, Harden

3. **Leaf Sprout** (Plante)
   - Type: Plante
   - Mouvements: Vine Whip, Powder Spore, Absorb

4. **Thunder Bird** (Électrique)
   - Type: Électrique
   - Mouvements: Thunder Shock, Peck, Thunder Wave

## 🛠️ Technologies

- **Kotlin** - Langage de programmation principal
- **Jetpack Compose** - Framework UI moderne
- **Android Architecture Components** - Gestion du cycle de vie
- **Material Design 3** - Design system

## 📝 Comment Ajouter une Nouvelle Créature

```kotlin
fun createNewCreature(): Creature = Creature(
    id = 5,
    name = "Creature Name",
    type = CreatureType.FIRE,
    maxHp = 50,
    attack = 60,
    defense = 50,
    speed = 55,
    moves = listOf(
        Move(13, "Move 1", CreatureType.FIRE, 50, 100),
        Move(14, "Move 2", CreatureType.NORMAL, 40, 100)
    )
)
```

Ajoutez la fonction à `CreatureFactory.kt` et ajoutez l'instance à `createRandomCreature()`.

## 📧 Contributions

Les contributions sont bienvenues ! Venez améliorer le jeu :)

---

**Status**: En développement 🚧

**Dernière mise à jour**: 28 Juin 2026
