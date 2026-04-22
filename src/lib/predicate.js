const PREDICATE = {
  isTaxon: (p) => p === 'in_taxon',
  isOrgan: (p) => p === 'located_in',
  isAssay: (p) => p === 'has_assay',
  isCellType: (p) => p === 'has_cell_type',
  isHallmark: (p) => p === 'has_hallmark',
  isDiagnosis: (p) => p === 'has_diagnosis',
  isCitation: (p) => p === 'has_citation',
  isOrigin: (p) => p === 'has_origin',
  isDataset: (p) => p === 'has_dataset',
  isExternalSource: (p) =>
    PREDICATE.isCellType(p) ||
    PREDICATE.isDiagnosis(p) ||
    PREDICATE.isCitation(p) ||
    PREDICATE.isOrigin(p) ||
    PREDICATE.isDataset(p),
};

export default PREDICATE