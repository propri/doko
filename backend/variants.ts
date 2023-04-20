//##################################################
//               Globale Regeln
//##################################################

// wird mit Neunen gespielt oder ohne
export const mitNeunen = true
// "Gewinner" Partei verliert, wenn zu hoch gewonnen ohne angesagt.
// Zwei Stufen. Wenn Keine 6 gespielt wird, aber nichts angesagt wurde, ist das Spiel stattdessen verloren
// Wenn Keine 3 gespielt wurde und nur Keine 9 angesagt wurde, ist das Spiel stattdessen verloren.
export const AnsageOderVerloren = false


//##################################################
//               Trumpf Regeln
//##################################################

// Ist Herz 10 höchster Trumpf?
export const herz10Trumpf = true
// Sticht die zweite Herz 10 die erste?
export const zweiteHerz10Gewinnt = true
// Ist im letzten Stich die erste Herz 10 höher? (impliziert zweiteHerz10Gewinnt === true)
export const letzterStichErsteHerz10 = true
// Wird mit Schweinereien gespielt? (Zwei Füchse auf einer Hand sind höchster Trumpf)
export const Schweinereien = false
// Wenn mit Schweinereien gespielt wird, sind beide Füchse Trumpf?
export const SchweinereienDoppelTrumpf = Schweinereien && false
// Wenn mit Schweinereien gespielt wird, muss das sofort angesagt werden oder erst wenn der erste Stich gespielt wird?
export const SchweinereienSofortAnsagen = Schweinereien && false
// Wenn mit Schweinereien gespielt wird, und nicht beide Füchse Trumpf sind, und nicht sofort angesagt werden muss, kann man sich aussuchen ob der erste oder der zweite Fuchs der höchste Trumpf ist?
export const SchweinereienAussuchen = !SchweinereienDoppelTrumpf && false


//##################################################
//               Sonderpunkt Regeln
//##################################################

// Wenn ohne Neunen gespielt wird, gibt es einen Sonderpunkt wenn Herz durchgeht?
export const HerzStichSonderpunkt = !mitNeunen && true
// Wenn mit HerzStichSonderpunkt gespielt wird, gibt es den Punkt auch wenn abgeworfen wird
export const HerzStichSonderpunktMitAbwerfen = HerzStichSonderpunkt && false
// Fuchs gefangen
export const FuchsGefangenSonderpunkt = true
// Letzter Stich mit Karlchen gemacht
export const Karlchen = true
// Karlchen gefangen
export const KarlchenFangen = Karlchen && true
// Nur Karo Damen können Karlchen fangen
export const KarlchenNurKaroDameFaengt = KarlchenFangen && true
// Sonderpunkt, wenn mit zweiter Herz 10 die erste gefangen wird
export const Herz10Fangen = zweiteHerz10Gewinnt && false
