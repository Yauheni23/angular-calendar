exports.isGuideCorrect = (guide) => {
    return guide.id && guide.name && guide.name.trim() && guide.startDate < guide.endDate;
}
